export type Game = {
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

export type HumanCreator = {
  url: string;
  name: string;
  image?: string;
  dateBirth?: string;
  dateDeath?: string;
  signature?: string;
  nativeName?: string;
}
