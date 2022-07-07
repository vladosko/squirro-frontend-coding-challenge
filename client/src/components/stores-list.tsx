import { useStoresQuery } from "../queries/use-stores.query";
import { StoreCard } from "./store-card";

import "./stores-list.css";

export const StoresList: React.FC = () => {
  const { stores } = useStoresQuery();

  return (
    <div className="store-card-list">
      {stores.map((store) => {
        return <StoreCard key={store.id} store={store} />;
      })}
    </div>
  );
};
