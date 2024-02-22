import React, { useContext } from "react";
import Context from "@/store/context/context";
import LargeViewCards from "@/components/product-t1/grid/user/cards/large-view-cards";
import ListViewCards from "@/components/product-t1/grid/user/cards/list-view-cards";

export const Grid = ({ products, status }: { products: any; status: any }) => {
  const { isGrid } = useContext(Context);
  return (
    <>
      {!isGrid ? (
        <>
          <ListViewCards products={products} />
        </>
      ) : (
        <>
          <LargeViewCards products={products} />
        </>
      )}
    </>
  );
};
