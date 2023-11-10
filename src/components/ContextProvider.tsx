import { MyContextProvider } from "../app/context/context";
import SearchBar from "./searchBar";

export default function Home() {
  return (
    <MyContextProvider>
      <SearchBar />
    </MyContextProvider>
  );
}