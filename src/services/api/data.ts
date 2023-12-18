import api from "@/services/api/axios";
import { useQuery } from "react-query";

import type { SearchItem } from "@/types/search";

async function findAllProperty(property: string) {
  const { data } = await api.local.get<
    {
      id: string;
      name: string;
    }[]
  >(`${property}.json`);

  return data;
}

export function useFindAllProperty(property: string) {
  return useQuery({
    queryKey: ["useFindAllProperty", property],
    queryFn: () => findAllProperty(property),
    select: (data): SearchItem[] =>
      data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
  });
}
