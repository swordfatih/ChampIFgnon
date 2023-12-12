import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import { type SparResponse } from "@/types/sparql";

async function searchGames(filter?: string) {
  const query = format({
    vars: ["url", "name", "logo", "description"],
    triples: [
      ["url", "wdt:P31", "wd:Q7889"],
      ["url", "rdfs:label", "name"],
      ["url", "schema:description", "description"],
    ],
    optionals: [["url", "wdt:P154", "logo"]],
    langFilters: [
      {
        value: "name",
        lang: "en",
      },
      {
        value: "description",
        lang: "en",
      },
    ],
    textFilters: filter
      ? [
          {
            value: "name",
            filter: `.*${filter}.*`,
            attributes: "i",
          },
        ]
      : undefined,
    limit: 100,
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useSearchGames(filter?: string) {
  return useQuery({
    queryKey: ["useFindGames", filter],
    queryFn: () => searchGames(filter),
  });
}
