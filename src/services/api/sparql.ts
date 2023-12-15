import { Generator, type SelectQuery, type Triple } from "sparqljs";

import type {
  SparLangFilter,
  SparRequest,
  SparTextFilter,
  SparTriple,
} from "@/types/sparql";

export const template: SelectQuery = {
  queryType: "SELECT",
  prefixes: {
    owl: "http://www.w3.org/2002/07/owl#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    foaf: "http://xmlns.com/foaf/0.1/",
    dc: "http://purl.org/dc/elements/1.1/",
    // http://dbpedia.org/resource/
    dbpedia2: "http://dbpedia.org/property/",
    dpedia: "http://dbpedia.org/",
    skos: "http://www.w3.org/2004/02/skos/core#",
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
  groups,
  concats,
  binds,
  distinct,
  unions,
}: SparRequest) {
  const generator = new Generator({});

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

  request.order = orders?.map((order) => ({
    expression: {
      termType: "Variable",
      value: order.subject,
      equals: () => true,
    },
    descending: order.descending,
  }));

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

  langFilters?.forEach(({ value, lang }: SparLangFilter) => {
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

  return generator.stringify(request).replace(/</g, "").replace(/>/g, "");
}
