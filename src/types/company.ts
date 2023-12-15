export type Location = {
  city: string;
  country: string;
};

export type Company = {
  name: string;
  logo: string;
  inceptionDate: string;
  website: string;
  location: Location;
};
