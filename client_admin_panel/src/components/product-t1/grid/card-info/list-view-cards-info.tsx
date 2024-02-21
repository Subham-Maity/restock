import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ListViewCardsInfo = ({
  product,
  href,
}: {
  product: any;
  href: string;
}) => {
  return (
    <div className="m-3 justify-start col-span-1 xs:col-span-2 lg:col-span-3 ">
      <Link href={href}>
        <div className="product-details">
          <h2 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-normal md:font-semibold lg:font-bold text-gray-800 dark:text-gray-100">
            {product.title}
          </h2>
          <p className="text-sm text-justify text-gray-900 dark:text-gray-300 hidden mt-4 lg:flex">
            {product.description}
          </p>
        </div>
      </Link>

      <Link href={href}>
        <div className="mt-4 flex">
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
            <span className="text-white text-sm">
              {product.rating.toFixed(1)}
            </span>
            <StarIcon className="w-3.5 text-sm text-gray-200" />
          </div>
        </div>
      </Link>
      <Link href={href}>
        <div className="price my-4">
          <p className="text-xl font-semibold dark:text-gray-100 text-neutral-900">
            ₹
            {Math.round(product.price * (1 - product.discountPercentage / 100))}
          </p>
          <p className="text-base block line-through font-medium text-gray-400">
            ₹{product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ListViewCardsInfo;
