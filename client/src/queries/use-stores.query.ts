import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { Store } from "../models/store.model";
import { WebApi } from "../models/web-api.model";
import { CountriesApiService } from "../services/countries-api.service";
import { StoresApiService } from "../services/stores-api.service";

export const useStoresQuery = (
  options?:
    | Omit<
        UseQueryOptions<Store[], unknown, Store[], "stores">,
        "queryKey" | "queryFn"
      >
    | undefined
) => {
  const storesQuery = useQuery("stores", StoresApiService.getAll, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });

  // Readonly query
  const countriesQuery = useQuery("countries", CountriesApiService.getAll, {
    enabled: false,
  });

  const stores = useMemo(() => {
    if (!countriesQuery.data || !storesQuery.data) return [];
    return storesQuery.data.map((store) => {
      if (!Array.isArray(store.countries)) return store;

      (store.countries as WebApi.Country[]).forEach((storeCountry) => {
        const country = countriesQuery.data.find(
          (apiCountry) => apiCountry.cca2 === storeCountry.attributes.code
        );
        storeCountry.attributes.flag = country?.flag;
      });

      return store;
    });
  }, [storesQuery.data, countriesQuery.data]);

  return { stores };
};
