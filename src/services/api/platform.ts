import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { SearchItem } from "@/types/search";
import type { SparResponse } from "@/types/sparql";

async function findAllPlatforms() {
  const query = format({
    distinct: true,
    vars: ["id", "name"],
    triples: [
      ["?game", "wdt:P31", "wd:Q7889"],
      ["?game", "wdt:P400", "id"],
      ["id", "rdfs:label", "name"],
    ],
    langFilters: [
      {
        value: "name",
        lang: "en",
      },
    ],
    limit: 200,
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindAllPlatforms() {
  return useQuery({
    queryKey: ["useFindAllPlatforms"],
    queryFn: findAllPlatforms,
    select: (data): SearchItem[] =>
      data.results.bindings.map((result) => ({
        value: result.id.value,
        label: result.name.value,
      })),
  });
}
