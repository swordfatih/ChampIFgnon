import axios from "axios";

const dbpedia = axios.create({
  baseURL: "https://dbpedia.org",
  headers: {
    "Content-Type": "application/sparql-results+json",
  },
});

dbpedia.interceptors.request.use((config) => {
  config.params = {
    "default-graph-uri": "http://dbpedia.org",
    ...config.params,
  };
  return config;
});

export default dbpedia;
