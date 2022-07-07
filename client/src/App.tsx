import { StoresList } from "./components/stores-list";
import { useQuery } from "react-query";
import { CountriesApiService } from "./services/countries-api.service";
import "./App.css";

function App() {
  useQuery("countries", CountriesApiService.getAll, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container mx-auto app">
      <StoresList />
    </div>
  );
}

export default App;
