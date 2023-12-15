import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import { type SparResponse } from "@/types/sparql";

async function searchCompany(companyId: string) {
  const query = format({
    vars: [
      "item",
      "name",
      "logo",
      "inception",
      "website",
      "hq_city",
      "hq_country",
    ],
    triples: [["item", "rdfs:label", "name"]],
    optionals: [
      [["item", "wdt:P154", "logo"]],
      [["item", "wdt:P571", "inception"]],
      [["item", "wdt:P856", "website"]],
      [
        ["item", "wdt:P159", "?hq_location"],
        ["?hq_location", "rdfs:label", "hq_city"],
        ["?hq_location", "wdt:P17", "?hq_countryId"],
        ["?hq_countryId", "rdfs:label", "hq_country"],
      ],
    ],
    binds: [
      {
        value: "item",
        node: `wd:${companyId}`,
      },
    ],
    langFilters: [
      {
        value: "name",
        lang: "en",
      },
      {
        value: "hq_city",
        lang: "en",
      },
      {
        value: "hq_country",
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

export function useSearchCompany(companyId: string) {
  return useQuery({
    queryKey: ["useSearchCompany", companyId],
    queryFn: () => searchCompany(companyId),
  });
}
