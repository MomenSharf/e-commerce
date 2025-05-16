import { Button } from "@/components/ui/button";
import CategorySelector from "./Searchbar/CategorySelector";
import SearchInput from "./Searchbar/SearchInput";

export default async function Searchbar() {
  return (
    <div className="flex max-w-2xl m-auto">
      <SearchInput />
      <CategorySelector />
      <Button className="max-md:hidden rounded-tl-none rounded-bl-none">
        Search
      </Button>
    </div>
  );
}
