export type SparTriple = [string, string, string];

export type SparLangFilter = {
  value: string;
  lang: string;
};

export type SparTextFilter = {
  value: string;
  filter: string;
  attributes: string;
};

export type SparRequest = {
  vars: string[];
  triples: SparTriple[];
  optionals?: SparTriple[];
  order?: {
    subject: string;
    descending: boolean;
  };
  langFilters?: SparLangFilter[];
  textFilters?: SparTextFilter[];
  limit?: number;
  offset?: number;
};

export type SparResponse = {
  head: {
    vars: string[];
  };
  results: {
    distinct: boolean;
    ordered: boolean;
    bindings: {
      [key: string]: {
        type: string;
        value: string;
      };
    }[];
  };
};
