import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { SparResponse } from "@/types/sparql";

async function searchGames(filter?: string, offset: number = 0) {
  const query = format({
    vars: ["url", "name", "logo", "description"],
    triples: [
      ["url", "wdt:P31", "wd:Q7889"],
      ["url", "rdfs:label", "name"],
      ["url", "schema:description", "description"],
    ],
    optionals: [[["url", "wdt:P154", "logo"]]],
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
      [["id", "wdt:P557", "date"]],
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

  console.log("findgamequery", query);

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
  });
}
