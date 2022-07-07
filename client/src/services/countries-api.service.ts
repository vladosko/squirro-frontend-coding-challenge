import axios from "axios";

export interface Country {
  flag: string;
  cca2: string;
  // other properties
}

const getAll = (): Promise<Country[]> => {
  return axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => res.data);
};

export const CountriesApiService = {
  getAll,
};
