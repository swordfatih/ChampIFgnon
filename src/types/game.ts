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
  id: string;
  name: string;
  type: string;
};

export type SearchGames = {
  search?: string;
  filters?: [string, string | undefined][];
  offset?: number;
};
