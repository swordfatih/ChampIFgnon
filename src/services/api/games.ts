import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import { type SparResponse } from "@/types/sparql";

async function findGames() {
  console.log("querying");

  const query = format({
    vars: ["item", "name", "logo", "description"],
    triples: [
      ["item", "wdt:P31", "wd:Q7889"],
      ["item", "rdfs:label", "name"],
      ["item", "schema:description", "description"],
    ],
    optionals: [["item", "wdt:P154", "logo"]],
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

  console.log("Query: ", query);

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useFindGames() {
  return useQuery({
    queryKey: ["useFindGames"],
    queryFn: findGames,
  });
}
