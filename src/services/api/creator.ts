import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { SparResponse } from "@/types/sparql";

async function findBestGames(id?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: ["game", "name", "logo", "score", "statement"],
    triples: [
      ["game", "wdt:P178", "creator"],
      ["game", "wdt:P31", "wd:Q7889"],
      ["game", "rdfs:label", "name"],
    ],
    optionals: [
      [
        ["game", "p:P444", "statement"],
        ["statement", "pq:P447", "wd:Q21039459"],
        ["statement", "pq:P459", "wd:Q114712322"],
        ["statement", "pq:P444", "score"],
      ],
      [["game", "wdt:P154", "logo"]],
    ],
    binds: [
      {
        node: `wd:${id}`,
        value: "creator",
      },
      {
        node: "en",
        value: "language",
        literal: true,
      },
    ],
    langFilters: [
      {
        value: "name",
        lang: "en",
      },
    ],
    order: {
      subject: "score",
      descending: true,
    },
    limit: 3,
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindBestGames(id?: string) {
  return useQuery({
    queryKey: ["useFindBestGames", id],
    queryFn: () => findBestGames(id),
  });
}
