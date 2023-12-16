/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetURLSearchParams } from "react-router-dom";

export function useSearchParamsState(
  searchParamName: string,
  params: [searchParams: URLSearchParams, setSearchParams: SetURLSearchParams],
  defaultValue?: string
): readonly [
  searchParamsState: string | undefined,
  setSearchParamsState: (newState: string) => void,
];

export function useSearchParamsState(
  searchParamName: string,
  params: [searchParams: URLSearchParams, setSearchParams: SetURLSearchParams],
  defaultValue?: number
): readonly [
  searchParamsState: number | undefined,
  setSearchParamsState: (newState: number) => void,
];

export function useSearchParamsState(
  searchParamName: string,
  [searchParams, setSearchParams]: [
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
  ],
  defaultValue: any
): readonly [
  searchParamsState: any,
  setSearchParamsState: (newState: any) => void,
] {
  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState: any) => {
    if (newState === undefined || newState.length === 0) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams);
      return;
    }

    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: newState.toString() }
    );

    setSearchParams(next);
  };

  if (!isNaN(+searchParamsState)) {
    return [+searchParamsState, setSearchParamsState];
  }

  return [searchParamsState, setSearchParamsState];
}
