import React from "react";
import { Badge } from "@/components/ui/shadcn/badge";

const CardInfo = ({ product }: { product: any }) => {
  return (
    <div className="flex gap-2 mx-2 mb-2">
      {product?.deleted && <Badge variant="destructive">Deleted</Badge>}
      {product.stock > 0 ? (
        <Badge>stock: {Math.min(product.stock ?? 0, 100000000)}</Badge>
      ) : (
        <Badge variant="destructive">Out of stock</Badge>
      )}
    </div>
  );
};

export default CardInfo;
