import {
  Generator,
  Parser,
  type Query,
  type SelectQuery,
  type Triple,
} from "sparqljs";

import type {
  SparLangFilter,
  SparRequest,
  SparTextFilter,
  SparTriple,
} from "@/types/sparql";

function searchTemplate(property: string, search: string) {
  return `
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wds: <http://www.wikidata.org/entity/statement/>
    PREFIX wdv: <http://www.wikidata.org/value/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX wikibase: <http://wikiba.se/ontology#>
    PREFIX p: <http://www.wikidata.org/prop/>
    PREFIX ps: <http://www.wikidata.org/prop/statement/>
    PREFIX pq: <http://www.wikidata.org/prop/qualifier/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema>
    PREFIX bd: <http://www.bigdata.com/rdf>
    PREFIX mwapi: <https://www.mediawiki.org/ontology#API/> 
    PREFIX schema: <http://schema.org/>

    SELECT DISTINCT ?item ?name ?description ?logo
    WHERE
    {
      SERVICE wikibase:mwapi
      {
        bd:serviceParam wikibase:endpoint "www.wikidata.org";
        wikibase:api "EntitySearch";
        mwapi:search "${search}"; 
        mwapi:language "en".
        ?${property} wikibase:apiOutputItem mwapi:item.
      }
    }
  `;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isQuery(query: any): query is Query {
  if ((query as Query).where) {
    return true;
  }

  return false;
}

export const template: SelectQuery = {
  queryType: "SELECT",
  prefixes: {
    owl: "http://www.w3.org/2002/07/owl#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    foaf: "http://xmlns.com/foaf/0.1/",
    dc: "http://purl.org/dc/elements/1.1/",
    dbr: "http://dbpedia.org/resource/",
    dbpedia2: "http://dbpedia.org/property/",
    dpedia: "http://dbpedia.org/",
    skos: "http://www.w3.org/2004/02/skos/core#",
    wikibase: "http://wikiba.se/ontology#",
    mwapi: "https://www.mediawiki.org/ontology#API/",
    schema: "http://schema.org/",
    bd: "http://www.bigdata.com/rdf",
  },
  variables: [],
  type: "query",
};

function formatTriples(vars: string[], triples?: SparTriple[]): Triple[] {
  if (triples === undefined) {
    return [];
  }

  return triples.map((triple) => ({
    subject: {
      termType:
        vars.includes(triple[0]) || triple[0].startsWith("?")
          ? "Variable"
          : "NamedNode",
      value: triple[0].replace("?", ""),
      equals: () => true,
    },
    predicate: {
      termType:
        vars.includes(triple[1]) || triple[1].startsWith("?")
          ? "Variable"
          : "NamedNode",
      value: triple[1].replace("?", ""),
      equals: () => true,
    },
    object: {
      termType:
        vars.includes(triple[2]) || triple[2].startsWith("?")
          ? "Variable"
          : "NamedNode",
      value: triple[2].replace("?", ""),
      equals: () => true,
    },
  }));
}

// format(['p'], [['p', 'rdf:type', 'dbo:Films']])
export function format({
  vars,
  triples,
  offset,
  limit,
  orders,
  optionals,
  langFilters,
  textFilters,
  tripleFilters,
  groups,
  concats,
  binds,
  distinct,
  unions,
  search,
  random,
}: SparRequest) {
  const generator = new Generator();

  const request = template;
  request.variables = vars.map((value) => ({
    termType: "Variable",
    value,
    equals: () => true,
  }));

  request.distinct = distinct;

  concats?.forEach((value) => {
    request.variables.push({
      expression: {
        aggregation: "group_concat",
        distinct: true,
        separator: ";",
        type: "aggregate",
        expression: {
          termType: "Variable",
          value,
          equals: () => true,
        },
      },
      variable: {
        termType: "Variable",
        value: `${value}s`,
        equals: () => true,
      },
      equals: () => true,
      termType: "Wildcard",
      value: "*",
    });
  });

  request.offset = offset;
  request.limit = limit;

  request.group = groups?.map((value) => ({
    expression: {
      termType: "Variable",
      value,
      equals: () => true,
    },
  }));

  if (orders) {
    if (!request.order || request.order?.length) {
      request.order = [];
    }

    orders.forEach(
      (order) =>
        request.order?.push({
          expression: {
            termType: "Variable",
            value: order.subject,
            equals: () => true,
          },
          descending: order.descending,
        })
    );
  }

  if (random) {
    if (!request.order || request.order?.length) {
      request.order = [];
    }

    request.order?.push({
      expression: {
        type: "operation",
        operator: "uuid",
        args: [],
      },
    });
  }

  request.where = [];

  binds?.forEach(({ value, node, literal }) => {
    request.where?.push({
      type: "bind",
      expression: literal
        ? {
            termType: "Literal",
            value: node,
            language: "",
            datatype: {
              termType: "NamedNode",
              value: "http://www.w3.org/2001/XMLSchema#string",
              equals: () => true,
            },
            equals: () => true,
          }
        : {
            termType: "NamedNode",
            value: node,
            equals: () => true,
          },
      variable: {
        termType: "Variable",
        value,
        equals: () => true,
      },
    });
  });

  if (unions) {
    request.where.push({
      type: "union",
      patterns: unions.map((union) => ({
        type: "bgp",
        triples: formatTriples(vars, union),
      })),
    });
  }

  if (tripleFilters) {
    request.where.push({
      type: "bgp",
      triples: formatTriples(
        vars,
        tripleFilters.flatMap((triple) => (triple ? [triple] : []))
      ),
    });
  }

  if (search) {
    const query = searchTemplate("id", search);
    const parser = new Parser({});
    const result = parser.parse(query);

    if (isQuery(result)) {
      if (result.where) {
        request.where.push(result.where[0]);
      }
    }
  }

  request.where.push({
    type: "bgp",
    triples: formatTriples(vars, triples),
  });

  optionals?.forEach((optional) => {
    request.where?.push({
      type: "optional",
      patterns: [
        {
          type: "bgp",
          triples: formatTriples(vars, optional),
        },
      ],
    });
  });

  langFilters
    ?.filter((item) => !item.optional)
    .forEach(({ value, lang }: SparLangFilter) => {
      request.where?.push({
        type: "filter",
        expression: {
          type: "operation",
          operator: "=",
          args: [
            {
              type: "operation",
              operator: "lang",
              args: [
                {
                  termType: "Variable",
                  value,
                  equals: () => true,
                },
              ],
            },
            {
              termType: "Literal",
              value: lang,
              language: "",
              datatype: {
                termType: "NamedNode",
                value: "http://www.w3.org/2001/XMLSchema#string",
                equals: () => true,
              },
              equals: () => true,
            },
          ],
        },
      });
    });

  langFilters
    ?.filter((item) => item.optional === true)
    .forEach(({ value, lang }: SparLangFilter) => {
      request.where?.push({
        type: "filter",
        expression: {
          type: "operation",
          operator: "||",
          args: [
            {
              type: "operation",
              operator: "!",
              args: [
                {
                  type: "operation",
                  operator: "bound",
                  args: [
                    {
                      termType: "Variable",
                      value,
                      equals: () => true,
                    },
                  ],
                },
              ],
            },
            {
              type: "operation",
              operator: "=",
              args: [
                {
                  type: "operation",
                  operator: "lang",
                  args: [
                    {
                      termType: "Variable",
                      value,
                      equals: () => true,
                    },
                  ],
                },
                {
                  termType: "Literal",
                  value: lang,
                  language: "",
                  datatype: {
                    termType: "NamedNode",
                    value: "http://www.w3.org/2001/XMLSchema#string",
                    equals: () => true,
                  },
                  equals: () => true,
                },
              ],
            },
          ],
        },
      });
    });

  textFilters?.forEach(({ value, filter, attributes }: SparTextFilter) => {
    request.where?.push({
      type: "filter",
      expression: {
        type: "operation",
        operator: "regex",
        args: [
          {
            termType: "Variable",
            value,
            equals: () => true,
          },
          {
            termType: "Literal",
            value: filter,
            language: "",
            datatype: {
              termType: "NamedNode",
              value: "http://www.w3.org/2001/XMLSchema#string",
              equals: () => true,
            },
            equals: () => true,
          },
          {
            termType: "Literal",
            value: attributes,
            language: "",
            datatype: {
              termType: "NamedNode",
              value: "http://www.w3.org/2001/XMLSchema#string",
              equals: () => true,
            },
            equals: () => true,
          },
        ],
      },
    });
  });

  return generator
    .stringify(request)
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/^PREFIX.*$/gm, "");
}
