import { Input } from "@/components/ui/shadcn/input";
import { Search } from "lucide-react";

const SearchInput = ({
  index,
  searchTerms,
  setSearchTerms,
  section,
}: {
  index: number;
  searchTerms: string[];
  setSearchTerms: any;
  section: any;
}) => (
  <div className="relative">
    <Input
      className="filter-search-input"
      type="text"
      placeholder={`Search for ${section.name}`}
      value={searchTerms[index]}
      onChange={(e) => {
        const newSearchTerms = [...searchTerms];
        newSearchTerms[index] = e.target.value;
        setSearchTerms(newSearchTerms);
      }}
    />
    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
      <Search />
    </div>
  </div>
);

export default SearchInput;
