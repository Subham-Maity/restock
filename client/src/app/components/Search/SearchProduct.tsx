import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Image from "next/image";

const SearchProduct = ({ items }: any) => {
  const handleOnSearch = (string: any, results: any) => {
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (items: any) => {
    return (
      <div className="flex focus:outline-none bg-cyan-200">
        <div className="h-20 w-24 object-fill object-center">
          <Image
            className="w-full h-full object-fill object-center"
            src={items.thumbnail}
            alt={items.category}
            height={100}
            width={80}
          />
        </div>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {items.title}
        </span>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            fuseOptions={{ keys: ["title"] }}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            className="focus:outline-none bg-cyan-500"
          />
        </div>
      </header>
    </div>
  );
};

export default SearchProduct;