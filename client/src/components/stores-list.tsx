import { useStoresQuery } from "../queries/use-stores.query";

import "./stores-list.css";

export const StoresList: React.FC = () => {
  const { stores } = useStoresQuery();

  return (
    <div className="store-card-list">
      {stores.map((store) => {
        return <h1>{store.id}</h1>;
      })}
    </div>
  );
};
