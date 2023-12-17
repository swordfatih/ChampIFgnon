import type { SearchFilter } from "@/types/search";

export type Game = {
  id: string;
  name: string;
  logo?: string;
  description: string;
  score?: string;
  steamId?: string;
};

export type Website = {
  uri?: string;
  name: string;
};

export type GameUniqueDetails = Game & {
  website?: string;
  date?: string;
  score?: string;
  critId?: string;
};

export type HumanCreator = {
  url: string;
  name: string;
  image?: string;
  dateBirth?: string;
  dateDeath?: string;
  signature?: string;
  nativeName?: string;
};

export type Creator = {
  item: string;
  name: string;
  person: boolean;
};

export type SearchGames = {
  search?: string;
  filters?: SearchFilter[];
  offset?: number;
};

export type RandomGame = Game & {
  date: string;
};
