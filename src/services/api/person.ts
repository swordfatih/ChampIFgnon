import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { PersonCreator } from "@/types/person";
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
        value: "item",
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
    select: (data): PersonCreator | undefined => {
      const person = data?.results.bindings[0];
      return person
        ? {
            name: person.name.value,
            url: person.url.value,
            image: person.image?.value,
            dateBirth: person.dateBirth?.value,
            dateDeath: person.dateDeath?.value,
            signature: person.signature?.value,
            nativeName: person.nativeName?.value,
          }
        : undefined;
    },
  });
}
