import React from "react";
import { Badge } from "@/components/ui/shadcn/badge";
import { StarFilledIcon } from "@radix-ui/react-icons";
const LargeViewCardsInfo = ({ product }: { product: any }) => {
  return (
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm px-2">
          <div className="text-gray-800 dark:text-gray-300">
            {product.title}
          </div>
        </h3>
        <div className="mt-1 flex items-center px-2">
          <Badge
            variant={
              product.rating >= 4.5
                ? "rating45"
                : product.rating >= 4
                  ? "rating4"
                  : product.rating >= 3.5
                    ? "rating35"
                    : product.rating >= 2
                      ? "rating2"
                      : "ratingLessThan2"
            }
          >
            <span className="text-white">{product.rating}</span>
            <StarFilledIcon className="ml-0.5 text-sm text-gray-200" />
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium block dark:text-gray-100 text-neutral-900">
          {Math.round(product.price * (1 - product.discountPercentage / 100))}₹
        </p>
        <p className="text-md block line-through font-medium text-gray-400 pr-2">
          {product.price}₹
        </p>
      </div>
    </div>
  );
};

export default LargeViewCardsInfo;
