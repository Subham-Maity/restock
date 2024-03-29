import React from "react";
import { CustomCardT2 } from "@/components/product-t1/grid/common/carousel/custom-card-t2";
import ListViewCardsInfo from "@/components/product-t1/grid/common/card-info/list-view-cards-info";
import { ListViewController } from "@/components/product-t1/grid/grid-control";
import { Card } from "@/components/ui/shadcn/card";
import { OPEN_MODAL, type1ProductDetails } from "@/links/product-list";

const ListViewCards = ({ products }: { products: any }) => {
  return (
    <>
      {products.map((product: any, index: number) => (
        <Card
          key={index}
          className={`default-card-2 ${ListViewController} overflow-hidden `}
        >
          <CustomCardT2
            product={product}
            className={
              "w-[300px] h-[198px] object-fill rounded-sm object-center"
            }
            height={300}
            width={300}
            href={type1ProductDetails + product.id + OPEN_MODAL}
          />
          <ListViewCardsInfo
            product={product}
            href={type1ProductDetails + product.id + OPEN_MODAL}
          />
        </Card>
      ))}
    </>
  );
};

export default ListViewCards;
