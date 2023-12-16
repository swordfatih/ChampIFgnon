export type SearchItem = {
  value: string;
  label: string;
};

export type SearchFilter = {
  label: string;
  id: string;
  state: readonly [
    searchParamsState: string | undefined,
    setSearchParamsState: (newState: string) => void,
  ];
  data: SearchItem[] | undefined;
};
