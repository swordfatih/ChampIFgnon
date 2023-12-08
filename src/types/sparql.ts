export type Triple = [string, string, string];

export type SparRequest = {
  vars: string[];
  triples: Triple[];
  order?: {
    subject: string;
    descending: boolean;
  };
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
