import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { SparResponse } from "@/types/sparql";

async function findPerson(id?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: [
      "item",
      "name",
      "image",
      "dateBirth",
      "dateDeath",
      "signature",
      "nativeName",
    ],
    triples: [
      ["item", "rdfs:label", "name"],
      ["item", "wdt:P31", "wd:Q5"],
    ],
    optionals: [
      [["item", "wdt:P18", "image"]],
      [["item", "wdt:P569", "dateBirth"]],
      [["item", "wdt:P570", "dateDeath"]],
      [["item", "wdt:P109", "signature"]],
      [["item", "wdt:P1559", "nativeName"]],
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
    limit: 1,
  });

  console.log("findpersonquery", query);

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindPerson(id?: string) {
  return useQuery({
    queryKey: ["useFindPersons", id],
    queryFn: () => findPerson(id),
  });
}
