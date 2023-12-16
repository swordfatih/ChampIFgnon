import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { SearchItem } from "@/types/search";
import type { SparResponse } from "@/types/sparql";

async function findAllProperty(property: string) {
  const query = format({
    distinct: true,
    vars: ["id", "name"],
    triples: [
      ["?game", "wdt:P31", "wd:Q7889"],
      ["?game", `wdt:${property}`, "id"],
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

export function useFindAllProperty(property: string) {
  return useQuery({
    queryKey: ["useFindAllProperty", property],
    queryFn: () => findAllProperty(property),
    select: (data): SearchItem[] =>
      data.results.bindings.map((result) => ({
        value: result.id.value,
        label: result.name.value,
      })),
  });
}
