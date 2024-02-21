import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

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
          <div
            className={`w-12 h-5 flex items-center justify-center rounded-sm text-sm gap-0.5 ${
              product.rating >= 4.5
                ? "bg-green-500 dark:bg-green-600 text-sm"
                : product.rating >= 4
                  ? "bg-yellow-400 dark:bg-yellow-600 text-sm"
                  : product.rating >= 3.5
                    ? "bg-yellow-400 dark:bg-yellow-600 text-sm"
                    : product.rating >= 2
                      ? "bg-orange-400 dark:bg-orange-600 text-sm"
                      : "bg-red-500 dark:bg-red-600 text-sm"
            }`}
          >
            <span className="text-white text-sm">{product.rating}</span>
            <StarIcon className="w-3.5 text-sm text-gray-200" />
          </div>
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
