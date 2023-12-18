import { useFindAllProperty } from "@/services/api/data";
import type { SetURLSearchParams } from "react-router-dom";

import type { SearchFilter } from "@/types/search";
import { useSearchParamsState } from "@/hooks/use-search-params-state";

export function useFilters(
  params: [URLSearchParams, SetURLSearchParams]
): SearchFilter[] {
  const genre = useSearchParamsState("genre", params);
  const platform = useSearchParamsState("platform", params);
  const mechanism = useSearchParamsState("mechanism", params);
  const language = useSearchParamsState("language", params);

  const { data: genres } = useFindAllProperty("genres");
  const { data: platforms } = useFindAllProperty("platforms");
  const { data: mechanisms } = useFindAllProperty("mechanisms");
  const { data: languages } = useFindAllProperty("languages");

  const filters = [
    {
      id: "P136",
      label: "Genre",
      state: genre,
      data: genres,
    },
    {
      id: "P400",
      label: "Platform",
      state: platform,
      data: platforms,
    },
    {
      id: "P4151",
      label: "Mechanism",
      state: mechanism,
      data: mechanisms,
    },
    {
      id: "P407",
      label: "Languages",
      state: language,
      data: languages,
    },
  ];

  return filters;
}
