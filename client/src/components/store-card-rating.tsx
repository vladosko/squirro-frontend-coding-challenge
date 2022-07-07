import { useMemo } from "react";
import { useRatingsArray } from "../hooks/use-ratings-array.hook";
import "./store-card-rating.css";

export interface StoreCardRatingProps {}

export const StoreCardRating: React.FC<{
  rating: number;
  onRatingClick: (r: number) => void;
}> = ({ rating, onRatingClick }) => {
  const ratings = useRatingsArray(rating);

  return (
    <div className="rating">
      {ratings.map((r, idx) => {
        return r ? (
          <span
            key={idx}
            onClick={() => onRatingClick(idx + 1)}
            className="rating__star"
          >
            &#9733;
          </span>
        ) : (
          <span
            key={idx}
            onClick={() => onRatingClick(idx + 1)}
            className="rating__star"
          >
            &#9734;
          </span>
        );
      })}
    </div>
  );
};
