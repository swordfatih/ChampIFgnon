export type Game = {
  id: string;
  url: string;
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
  genres?: string[];
};
