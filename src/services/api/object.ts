import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type { Property } from "@/types/object";
import type { SparResponse } from "@/types/sparql";

async function findMultipleProperty(id?: string, property?: string) {
  if (!id) {
    return null;
  }

  const query = format({
    vars: ["id", "item", "name"],
    triples: [
      ["id", `wdt:${property}`, "item"],
      ["item", "rdfs:label", "name"],
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
    orders: [
      {
        subject: "name",
        descending: false,
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

export function useFindMultipleProperty(id?: string, property?: string) {
  return useQuery({
    queryKey: ["useFindMultipleProperty", id, property],
    queryFn: () => findMultipleProperty(id, property),
    select: (data): Property[] | undefined =>
      data?.results.bindings.map((result) => ({
        id: result.id.value,
        name: result.name.value,
        item: result.item.value,
      })),
  });
}
