import { useCallback } from "react";
import { Store } from "../models/store.model";
import { WebApi } from "../models/web-api.model";
import { useStoreUpdateMutation } from "../mutations/use-store-update.mutation";

export const useHandleRatingChange = (store: Store) => {
  const { mutate } = useStoreUpdateMutation();
  const handleRatingChange = useCallback(
    (rating: number) => {
      mutate({
        id: store.id,
        type: store.type,
        attributes: { rating } as WebApi.StoreAttributes,
      });
    },
    [mutate]
  );
  return handleRatingChange;
};
