import { CustomCardT2 } from "@/components/product-t1/grid/common/carousel/custom-card-t2";
import React from "react";
import { LargeGridController } from "@/components/product-t1/grid/grid-control";
import LargeViewCardsInfo from "@/components/product-t1/grid/common/card-info/large-view-cards-info";
import { Card } from "@/components/ui/shadcn/card";
import Link from "next/link";
import {
  editProduct,
  OPEN_MODAL,
  type1ProductDetails,
} from "@/links/product-list";
import CardAdminInfo from "@/components/product-t1/grid/admin/admin-info/card-admin-info";
import AdminActionCard from "@/components/product-t1/grid/admin/admin-action/admin-action-card";

const LargeViewCards = ({ products }: { products: any }) => {
  return (
    <div className={LargeGridController}>
      {products.map((product: any, index: number) => (
        <Card
          key={index}
          className="default-card-2 rounded-lg overflow-hidden relative"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <div className="w-full h-full">
              <CustomCardT2
                product={product}
                className={
                  "w-[300px] h-[300px] object-fill rounded-sm object-center"
                }
                height={300}
                width={300}
                href={type1ProductDetails + product.id + OPEN_MODAL}
              />
            </div>
          </div>
          <Link href={type1ProductDetails + product.id + OPEN_MODAL}>
            <div className="mb-6 mt-2">
              <LargeViewCardsInfo product={product} />
            </div>
          </Link>
          <CardAdminInfo product={product} />
          <AdminActionCard
            href={editProduct}
            className="absolute top-0 right-0 z-10 mt-2"
          />
        </Card>
      ))}
    </div>
  );
};

export default LargeViewCards;
