"use clients";

import { PcComponentProductList } from "@/app/components/products/pages/pc-components/ProductList";
import { PcComponentProductListOnSearch } from "@/app/components/products/pages/pc-components/ProductListOnSearch";
import Context from "@/context/Context";
import { useContext } from "react";

const ProductListView = () => {
  const { isGrid } = useContext(Context);

  return (
    <div>
      {isGrid ? <PcComponentProductList /> : <PcComponentProductListOnSearch />}
    </div>
  );
};

export default ProductListView;
