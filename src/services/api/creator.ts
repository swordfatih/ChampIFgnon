import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { Game } from "@/types/game";
import type { SparResponse } from "@/types/sparql";

async function findBestGames(id?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: [
      "game",
      "name",
      "logo",
      "score",
      "statement",
      "creator",
      "description",
    ],
    triples: [
      ["game", "wdt:P178", "creator"],
      ["game", "wdt:P31", "wd:Q7889"],
      ["game", "rdfs:label", "name"],
      ["game", "schema:description", "?description"],
    ],
    unions: [
      [["game", "wdt:P178", "creator"]],
      [["game", "wdt:P123", "creator"]],
    ],
    optionals: [
      [
        ["game", "p:P444", "statement"],
        ["statement", "pq:P447", "wd:Q21039459"],
        ["statement", "pq:P459", "wd:Q114712322"],
        ["statement", "ps:P444", "score"],
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
      {
        value: "description",
        lang: "en",
      },
    ],
    orders: [
      {
        subject: "score",
        descending: true,
      },
      {
        subject: "name",
        descending: false,
      },
    ],
    distinct: true,
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
    select: (data): Game[] | undefined =>
      data?.results.bindings.map((game) => ({
        name: game.name.value,
        id: game.game.value,
        description: game.description?.value,
        logo: game.logo?.value,
        website: game.website?.value,
        date: game.date?.value,
        score: game.score?.value,
      })),
  });
}
