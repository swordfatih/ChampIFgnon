export type Game = {
  id: string;
  name: string;
  logo?: string;
  description: string;
};

export type Website = {
  uri?: string;
  name: string;
};

export type GameUniqueDetails = Game & {
  website?: string;
  date?: string;
};

export type SearchGames = {
  filter?: string;
  gender?: string;
  offset?: number;
};
