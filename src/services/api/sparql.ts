import { Generator, type SelectQuery } from "sparqljs";

import { type SparRequest } from "@/types/sparql";

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

// format(['p'], [['p', 'rdf:type', 'dbo:Films']])
export function format({ vars, triples, offset, limit, order }: SparRequest) {
  const generator = new Generator({});

  const request = template;
  request.variables = vars.map((value) => ({
    termType: "Variable",
    value,
    equals: () => true,
  }));

  request.offset = offset;
  request.limit = limit;

  if (order !== undefined) {
    request.order = [
      {
        expression: {
          termType: "Variable",
          value: order.subject,
          equals: () => true,
        },
        descending: order.descending,
      },
    ];
  }

  request.where = [
    {
      type: "bgp",
      triples: triples.map((triple) => ({
        subject: {
          termType: vars.includes(triple[0]) ? "Variable" : "NamedNode",
          value: triple[0],
          equals: () => true,
        },
        predicate: {
          termType: vars.includes(triple[1]) ? "Variable" : "NamedNode",
          value: triple[1],
          equals: () => true,
        },
        object: {
          termType: vars.includes(triple[2]) ? "Variable" : "NamedNode",
          value: triple[2],
          equals: () => true,
        },
      })),
    },
  ];

  return generator.stringify(request).replace(/</g, "").replace(/>/g, "");
}
