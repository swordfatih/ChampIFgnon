import dbpedia from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import { type SparResponse } from "@/types/sparql";

async function findFilms() {
  const query = format({
    vars: ["p"],
    triples: [["p", "rdf:type", "dbo:Film"]],
    limit: 100,
  });

  const { data } = await dbpedia.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindFilms() {
  return useQuery({
    queryKey: ["useFindFilms"],
    queryFn: findFilms,
  });
}
