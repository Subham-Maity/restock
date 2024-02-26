import React, { useContext } from "react";
import Context from "@/store/context/context";
import LargeViewCards from "@/components/product-t1/grid/user/cards/large-view-cards";
import ListViewCards from "@/components/product-t1/grid/user/cards/list-view-cards";
import GridLargeViewSkeleton from "@/loader/skeleton/product-t1/grid-large-view-skeleton";

export const Grid = ({ products, status }: { products: any; status: any }) => {
  const { isGrid } = useContext(Context);
  return (
    <>
      {!isGrid ? (
        <>
          {status === "loading" ? (
            <GridLargeViewSkeleton />
          ) : (
            <ListViewCards products={products} />
          )}
        </>
      ) : (
        <>
          {status === "loading" ? (
            <GridLargeViewSkeleton />
          ) : (
            <LargeViewCards products={products} />
          )}
        </>
      )}
    </>
  );
};
