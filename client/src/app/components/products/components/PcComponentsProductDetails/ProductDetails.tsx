"use client";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "next/navigation";
import {
  fetchAllProductByIdAsync,
  selectProductById,
} from "@/app/components/products/pages/pc-components/productListSlice";
import Image from "next/image";
import Link from "next/link";
import { AppDispatch } from "@/lib/redux/store";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProductById);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  const [currentImage, setCurrentImage] = useState("/");
  const handleMouseEnter = (src: any) => {
    setCurrentImage(src);
  };

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllProductByIdAsync(params.id));
    // if (product && product.images && product.images.length > 0) {
    //   console.log("product", product.images[0]);
    // }
  }, [dispatch, params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Add a check for empty product data and set currentImage to the first image if available.
  if (!product.images || product.images.length === 0) {
    return <div>No product images available.</div>;
  }

  return (
    <div className="lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb: any) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <Link
                        href={"breadcrumb.href"}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </Link>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <Link
                  href={"product.href"}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="flex">
            {/* Image gallery */}
            <div className="w-fit flex flex-col-reverse sm:flex-row lg:pl-28 py-4 sm:space-x-4 mb-10 justify-center lg:justify-start lg:border-r lg:border-gray-200 lg:pr-8">
              <div className="flex flex-row h-fit w-fit sm:flex-col product-previews mt-3 sm:mt-0 space-x-2 sm:space-x-0 md:space-y-2 p-2 border border-gray-400 rounded-xl">
                {product.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="preview-image flex"
                    onMouseEnter={() => handleMouseEnter(image)}
                  >
                    <Image
                      src={image}
                      alt={product.title}
                      className="rounded-md border border-gray-400 hover:border-blue-400 "
                      height={100}
                      width={100}
                    />
                  </div>
                ))}
              </div>
              <div className="h-[400px] w-[400px bg-gray-200 my-auto">
                <Image
                  src={currentImage}
                  width={400}
                  height={400}
                  alt="Product"
                  className="rounded-lg flex my-auto"
                />
              </div>
            </div>
            <div className="pl-6 space-y-6">
              <h1 className="justify-start text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-3xl">
                {product.title}
              </h1>
              {/* Ratings */}
              <div
                className={`flex items-center justify-center w-fit px-2 rounded-xl text-sm gap-0.5 ${
                  product.rating >= 4
                    ? "bg-green-500 dark:bg-green-600 "
                    : product.rating >= 3.5
                    ? "bg-yellow-400 dark:bg-yellow-600 text-sm"
                    : product.rating >= 2
                    ? "bg-orange-400 dark:bg-orange-600 text-sm"
                    : "bg-red-500 dark:bg-red-600 text-sm"
                }`}
              >
                <p className="">{product.rating}</p>

                {/* Description */}
              </div>
              <div>
                <div className="space-y-6">
                  <h3 className="sr-only text-2xl font-semibold">
                    Description
                  </h3>
                  <p className="text-base text-gray-900 dark:text-gray-300">
                    {product.description}
                  </p>
                  <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-300">
                    ₹ {product.price} /-
                  </p>

                  <div className="flex space-x-10 mt-10 justify-center">
                    <button
                      type="submit"
                      className="addToCart w-40 flex items-center justify-center rounded-2xl border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="submit"
                      className="buyNow w-40 flex items-center justify-center rounded-2xl border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ₹{product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}

                {/* Sizes */}

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-800 dark:text-gray-300">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Details
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-800 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
