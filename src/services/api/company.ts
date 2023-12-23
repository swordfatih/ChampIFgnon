import api from "@/services/api/axios";
import { format } from "@/services/api/sparql";
import { useQuery } from "react-query";

import type {
  SparBind,
  SparLangFilter,
  SparResponse,
  SparTriple,
} from "@/types/sparql";

interface QueryObject {
  vars: string[];
  triples: SparTriple[];
  optionals: SparTriple[][];
  binds: SparBind[];
  langFilters: SparLangFilter[];
  limit: number;
}

async function searchCompany(companyId?: string) {
  if (companyId === undefined) {
    return null;
  }

  const queryObject: QueryObject = {
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
        optional: true,
      },
      {
        value: "hq_country",
        lang: "en",
        optional: true,
      },
    ],
    limit: 1,
  };

  const query = format(queryObject);

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useSearchCompany(companyId?: string) {
  return useQuery({
    queryKey: ["useSearchCompany", companyId],
    queryFn: () => searchCompany(companyId),
    select: (data) => {
      const company = data?.results.bindings[0];
      return {
        id: company?.item.value,
        name: company?.name.value,
        logo: company?.logo?.value,
        inception: company?.inception?.value,
        website: company?.website?.value,
        city: company?.hq_city?.value,
        country: company?.hq_country?.value,
      };
    },
  });
}
