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

          <div className="flex flex-col lg:flex-row">
            {/* Image gallery */}
            <div className="w-fit flex flex-col-reverse sm:flex-row  py-4 sm:space-x-4 mb-10 justify-center lg:justify-start lg:border-r lg:border-gray-400 lg:pr-8">
              <div className="flex flex-row sm:flex-col product-previews mt-3 sm:mt-0 space-x-2 sm:space-x-0 md:space-y-2 p-2 border border-gray-400 rounded-xl touch-pan-y">
                {product.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="preview-image flex"
                    onMouseEnter={() => handleMouseEnter(image)}
                  >
                    <Image
                      src={image}
                      alt={product.title}
                      className="rounded-lg border border-gray-400 hover:border-blue-400 "
                      height={100}
                      width={100}
                    />
                  </div>
                ))}
              </div>
              <div className=" bg-gray-200 my-auto">
                <Image
                  src={currentImage}
                  width={500}
                  height={500}
                  alt="Product"
                  className="rounded-lg my-auto h-[500px] w-[500px]"
                />
              </div>
            </div>
            <div className="px-6 space-y-6">
              <h1 className="justify-start text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-3xl">
                {product.title}
              </h1>
              {/* Ratings */}
              <div className="flex border-2 shadow-xl dark:border-black/20 border-gray-700/20 rounded-lg w-fit">
              <div
                className={`flex items-center justify-center w-14 h-6 rounded-md text-sm gap-0.5 font-semibold text-white ${
                  product.rating.toFixed(1) >= 4
                    ? "bg-green-600 dark:bg-green-600 "
                    : product.rating >= 3.5
                    ? "bg-yellow-400 dark:bg-yellow-600 text-sm"
                    : product.rating >= 2
                    ? "bg-orange-400 dark:bg-orange-600 text-sm"
                    : "bg-red-500 dark:bg-red-600 text-sm"
                }`}
              >
                <p className="">{product.rating}</p>
                
                </div>

                {/* Rating Star Count */}
                <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating.toFixed(1) > rating
                              ? "text-gray-700 dark:text-white"
                              : "text-gray-50 dark:text-gray-500",
                            "h-5 w-5 flex-shrink-0",
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    </div>

                {/* Description */}
              
              <div>
                <div className="space-y-6">
                  <h3 className="sr-only text-2xl font-semibold">
                    Description
                  </h3>
                  <p className="text-lg font- text-justify text-gray-900 dark:text-gray-300 lg:break-normal lg:mr-auto w-[38rem]">
                    {product.description}
                  </p>
                  <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-300">
                    ₹ {product.price} /-
                  </p>

                  <div className="flex space-x-5 mt-10 justify-start">
                    <button
                      type="submit"
                      className="addToCart w-60 flex items-center justify-center rounded-xl border-2 border-indigo-600  px-8 py-3 text-base font-medium text-indigo-600 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="submit"
                      className="buyNow w-60 flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product info */}
        </div>
      )}
    </div>
  );
}
