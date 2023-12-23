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

async function searchCompany(companyId: string, getLocation: boolean) {
  const queryObject: QueryObject = {
    vars: ["item", "name", "logo", "inception", "website"],
    triples: [["item", "rdfs:label", "name"]],
    optionals: [
      [["item", "wdt:P154", "logo"]],
      [["item", "wdt:P571", "inception"]],
      [["item", "wdt:P856", "website"]],
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
    ],
    limit: 1,
  };

  if (getLocation) {
    queryObject.vars.push("hq_city", "hq_country");
    queryObject.langFilters.push(
      {
        value: "hq_city",
        lang: "en",
      },
      {
        value: "hq_country",
        lang: "en",
      }
    );

    queryObject.optionals.push([
      ["item", "wdt:P159", "?hq_location"],
      ["?hq_location", "rdfs:label", "hq_city"],
      ["?hq_location", "wdt:P17", "?hq_countryId"],
      ["?hq_countryId", "rdfs:label", "hq_country"],
    ]);
  }

  const query = format(queryObject);

  const { data } = await api.wikidata.get<SparResponse>("sparql", {
    params: {
      query,
    },
  });

  return data;
}

export function useSearchCompany(
  companyId: string,
  getLocation: boolean = true
) {
  return useQuery({
    queryKey: ["useSearchCompany", companyId, getLocation],
    queryFn: () => searchCompany(companyId, getLocation),
  });
}
