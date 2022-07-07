import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Store } from "../models/store.model";
import { WebApi } from "../models/web-api.model";
import { StoresApiService } from "../services/stores-api.service";

export const useStoreUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(StoresApiService.update, {
    onMutate: (data) => {
      queryClient.setQueryData<Store[] | undefined>("stores", (oldData) => {
        const storeIdx = oldData?.findIndex(({ id }) => id === data.id) ?? -1;
        console.log(storeIdx);
        const oldStore: Store | undefined = oldData?.[storeIdx];
        if (!oldStore || !oldData) return oldData;

        const newStore = {
          ...oldStore,
          attributes: {
            ...oldStore?.attributes,
            ...data.attributes,
          },
        };

        return [
          ...oldData.slice(0, storeIdx),
          newStore,
          ...oldData.slice(storeIdx + 1),
        ];
      });
    },
  });
};
