import { useMemo } from "react";

export const useRatingsArray = (rating: number): boolean[] => {
  return useMemo(() => {
    return Array(5)
      .fill(null)
      .map((_, idx) => idx < rating);
  }, [rating]);
};
