export type Game = {
  url: string;
  name: string;
  logo: string;
  description: string;
};

export type Website = {
  uri?: string;
  name: string;
};

export type GameUniqueDetails = Game & {
  website: string;
};
