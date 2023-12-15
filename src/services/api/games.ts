import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { Game, GameUniqueDetails } from "@/types/game";
import type { SparResponse } from "@/types/sparql";

async function searchGames(filter?: string, offset: number = 0) {
  const query = format({
    vars: ["id", "name", "logo", "description"],
    triples: [
      ["id", "wdt:P31", "wd:Q7889"],
      ["id", "rdfs:label", "name"],
      ["id", "schema:description", "description"],
    ],
    optionals: [[["id", "wdt:P154", "logo"]]],
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
    limit: 12,
    offset: offset,
  });

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useSearchGames(filter?: string, offset: number = 0) {
  return useQuery({
    queryKey: ["useSearchGames", filter, offset],
    queryFn: () => searchGames(filter, offset),
    select: (data): Game[] | undefined =>
      data?.results.bindings.map((game) => ({
        name: game.name.value,
        id: game.id.value,
        description: game.description.value,
        logo: game.logo?.value,
      })),
  });
}

async function findGame(id?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: ["id", "name", "logo", "date", "website", "description"],
    triples: [
      ["id", "rdfs:label", "?name"],
      ["id", "schema:description", "?description"],
    ],
    optionals: [
      [["id", "wdt:P154", "logo"]],
      [["id", "wdt:P577", "date"]],
      [["id", "wdt:P856", "website"]],
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
    queryKey: ["useFindGames", id],
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
    vars: ["id", "item", "name", "type"],
    triples: [
      ["id", `wdt:${property}`, "item"],
      ["item", "rdfs:label", "name"],
      ["item", "wdt:P31", "type"],
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
  });
}
