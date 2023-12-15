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

export type SparBind = {
  value: string;
  node: string;
  literal?: boolean;
};

export type SparRequest = {
  vars: string[];
  triples: SparTriple[];
  unions?: SparTriple[][];
  optionals?: SparTriple[][];
  orders?: {
    subject: string;
    descending: boolean;
  }[];
  langFilters?: SparLangFilter[];
  textFilters?: SparTextFilter[];
  limit?: number;
  offset?: number;
  groups?: string[];
  concats?: string[];
  binds?: SparBind[];
  distinct?: boolean;
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
