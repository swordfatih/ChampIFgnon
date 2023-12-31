import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type {
  Creator,
  Game,
  GameUniqueDetails,
  RandomGame,
  SearchGames,
} from "@/types/game";
import type { SparRequest, SparResponse } from "@/types/sparql";

async function searchGames({ search, filters, offset }: SearchGames) {
  const query: SparRequest = {
    vars: ["id", "name", "logo", "description", "steamId", "score"],
    triples: [
      ["id", "wdt:P31", "wd:Q7889"],
      ["id", "rdfs:label", "name"],
      ["id", "schema:description", "description"],
    ],
    optionals: [
      [["id", "wdt:P154", "logo"]],
      [["id", "wdt:P1733", "steamId"]],
      [
        ["id", "p:P444", "?statement"],
        ["?statement", "pq:P447", "wd:Q21039459"],
        ["?statement", "pq:P459", "wd:Q114712322"],
        ["?statement", "ps:P444", "score"],
      ],
    ],
    distinct: true,
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
    search,
    tripleFilters: filters?.map(({ id, state: [value, _] }) =>
      value ? ["id", `wdt:${id}`, `wd:${value}`] : undefined
    ),
    limit: 12,
    offset,
  };

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query: format(query),
    },
  });

  if (search && data && data.results.bindings.length === 0) {
    query.search = undefined;
    query.textFilters = [
      {
        filter: `.*${search}.*`,
        value: "name",
        attributes: "i",
      },
    ];

    const { data } = await api.wikidata.get<SparResponse>("sparql", {
      params: {
        query: format(query),
      },
    });

    return data;
  }

  return data;
}

export function useSearchGames(query: SearchGames) {
  return useQuery({
    queryKey: ["useSearchGames", query],
    queryFn: () => searchGames(query),
    select: (data): Game[] | undefined =>
      data?.results.bindings.map((game) => ({
        name: game.name.value,
        id: game.id.value,
        description: game.description.value,
        logo: game.logo?.value,
        steamId: game.steamId?.value,
        score: game.score?.value,
      })),
  });
}

async function findGame(id?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: [
      "id",
      "name",
      "logo",
      "date",
      "website",
      "description",
      "score",
      "critId",
      "statement",
      "steamId",
    ],
    triples: [
      ["id", "rdfs:label", "?name"],
      ["id", "schema:description", "?description"],
    ],
    optionals: [
      [["id", "wdt:P154", "logo"]],
      [["id", "wdt:P577", "date"]],
      [["id", "wdt:P856", "website"]],
      [
        ["id", "p:P444", "statement"],
        ["statement", "pq:P447", "wd:Q21039459"],
        ["statement", "pq:P459", "wd:Q114712322"],
        ["statement", "ps:P444", "score"],
        ["id", "wdt:P2864", "critId"],
      ],
      [["id", "wdt:P1733", "steamId"]],
    ],
    binds: [
      {
        node: `wd:${id}`,
        value: "id",
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
    limit: 1,
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindGame(id?: string) {
  return useQuery({
    queryKey: ["useFindGame", id],
    queryFn: () => findGame(id),
    select: (data): GameUniqueDetails | undefined => {
      const game = data?.results.bindings[0];
      return game
        ? {
            name: game.name.value,
            id: game.id.value,
            description: game.description.value,
            logo: game.logo?.value,
            website: game.website?.value,
            date: game.date?.value,
            score: game.score?.value,
            critId: game.critId?.value,
            steamId: game.steamId?.value,
          }
        : undefined;
    },
  });
}

async function findCreators(id?: string, property?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: ["id", "item", "name", "person"],
    triples: [
      ["id", `p:${property}`, "?statement"],
      ["?statement", `ps:${property}`, "item"],
      ["item", "rdfs:label", "name"],
    ],
    optionals: [
      [
        ["item", "wdt:P31", "person"],
        ["item", "wdt:P31", "wd:Q5"],
      ],
    ],
    binds: [
      {
        node: `wd:${id}`,
        value: "id",
      },
    ],
    langFilters: [
      {
        value: "name",
        lang: "en",
      },
    ],
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindCreators(id?: string, property?: string) {
  return useQuery({
    queryKey: ["useFindCreators", id, property],
    queryFn: () => findCreators(id, property),
    select: (data): Creator[] | undefined =>
      data?.results.bindings.map((result) => ({
        item: result.item.value,
        name: result.name.value,
        person: result.person?.value !== undefined,
      })),
  });
}

async function findRandomGames() {
  const query = format({
    vars: ["id", "name", "date", "logo", "steamId", "description"],
    triples: [
      ["id", "wdt:P31", "wd:Q7889"],
      ["id", "rdfs:label", "name"],
      ["id", "wdt:P577", "date"],
      ["id", "schema:description", "description"],
      ["id", "wdt:P154", "logo"],
      ["id", "wdt:P1733", "steamId"],
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
    limit: 100,
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindRandomGames() {
  return useQuery({
    queryKey: ["useFindRandomGames"],
    queryFn: findRandomGames,
    select: (data): RandomGame[] | undefined => {
      const games = data.results.bindings;

      return games.map((game) => ({
        name: game.name.value,
        id: game.id.value,
        logo: game.logo?.value,
        date: game.date.value,
        steamId: game.steamId?.value,
        description: game.description.value,
      }));
    },
  });
}
