"use client";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import React, { Component } from "react";
import { useParams } from "next/navigation";
import {
  fetchAllProductByIdAsync,
  selectProductById,
} from "@/lib/features/Product/fetchProductsByFiltersAsync";
import Image from "next/image";
import Link from "next/link";
import { AppDispatch } from "@/lib/redux/store";
import { addToCartAsync, selectItems } from "@/lib/features/Cart/cartSlice";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";
import { User } from "@/lib/types/Auth/auth.type";
import { LineWave } from "react-loader-spinner";
import ProductDetailsSkeleton from "./skeleton/ProductDetailsSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiLightningFill } from "react-icons/pi";
import { FaCartPlus } from "react-icons/fa";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { CartItem } from "@/lib/types/Cart/cart.type";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const product = useSelector(selectProductById);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const user: User | null = useSelector(selectLoggedInUser);
  const items: CartItem[] = useSelector(selectItems);
  const [isCartHoverVisible, setCartHoverVisible] = useState(false);
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
    return <ProductDetailsSkeleton />;
  }

  if (!product.images || product.images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LineWave
          height="200"
          width="200"
          color="#4fa94d"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    );
  }

  const handleCart = (e: any) => {
    e.preventDefault();
    if (items.findIndex((item) => item?.product?.id === product?.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
        user: user ? user.id : "anonymous",
      };
      dispatch(addToCartAsync(newItem))
        .then(() => {
          setCartHoverVisible(true); // Show the cart popup after a successful dispatch
          toast.success(`${product.title} is added to your cart`, {
            position: "bottom-right",
            autoClose: 1000,
          });
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      toast.warning(`${product.title} is already in your cart`, {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="mx-auto 2xl:mx-10 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
      {product && (
        <div className="pt-6">
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={1000}
          />
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
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
            <div className="w-fit flex flex-col-reverse lg:flex-row mx-auto py-4 sm:space-x-4 mb-10 justify-center lg:justify-start lg:border-r lg:border-gray-400 lg:pr-4 xl:pr-8">
              <div className="flex flex-row lg:flex-col product-previews mt-3 lg:mt-0 space-x-2 lg:space-x-0 lg:space-y-2 p-2 border border-gray-400 rounded-xl h-fit w-fit mx-auto my-auto">
                {product.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="preview-image flex w-fit mx-auto"
                    onMouseEnter={() => handleMouseEnter(image)}
                  >
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      alt={product.title}
                      className="rounded-lg border border-gray-400 hover:border-blue-400 h-[100px] w-[100px]"
                    />
                  </div>
                ))}
              </div>
              <div className="main-image w-fit h-fit lg:w-[400px] xl:w-[500px] my-auto">
                <TransformWrapper>
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                      <TransformComponent>
                        <Image
                          src={currentImage}
                          width={500}
                          height={500}
                          alt="Product"
                          className="rounded-lg h-[400px] xl:h-[500px]"
                        />
                      </TransformComponent>
                      <div className="border dark:border-gray-300/20 border-gray-800/20 rounded-lg mt-2 text-center">
                        <button onClick={() => zoomIn()}>
                          <AiOutlineZoomIn className="text-3xl mt-2 dark:hover:text-gray-200 dark:text-gray-400 text-neutral-900/30 hover:text-neutral-900/70" />
                        </button>
                        <button onClick={() => zoomOut()}>
                          <AiOutlineZoomOut className="text-3xl ml-4 mt-2 dark:hover:text-gray-200 dark:text-gray-400 text-neutral-900/30 hover:text-neutral-900/70" />
                        </button>
                        <button onClick={() => resetTransform()}>
                          <IoClose className="text-3xl ml-4 mt-2 dark:hover:text-gray-200 dark:text-gray-400 text-neutral-900/30 hover:text-neutral-900/70" />
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </div>

            <div className="lg:pl-6 md:space-y-6 w-full wrap">
              <h1 className="justify-start text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-3xl">
                {product.title}
              </h1>
              {/* Ratings */}
              <div className="flex border-2 shadow-xl dark:border-black/20 border-gray-700/20 rounded-lg w-fit">
                <div
                  className={`flex items-center justify-center w-12 h-6 rounded-lg text-sm gap-0.5 font-semibold text-white ${
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
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Description */}

              <div>
                <div className="space-y-4">
                  <p className="text-lg font-Comfortaa text-justify text-gray-900 dark:text-gray-300">
                    {product.description}
                  </p>
                  <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-300">
                    ₹ {product.price} /-
                  </p>

                  <div className="w-full lg:mx-0 lg:mr-auto lg:w-fit flex space-x-5 mt-0 lg:mt-10 justify-center lg:justify-start fixed bottom-0 left-0 right-0 z-40 h-16 lg:bg-transparent lg:dark:bg-transparent bg-gray-200 dark:bg-gray-800 p-2 rounded-xl backdrop-blur lg:relative">
                    <button
                      type="submit"
                      className="addToCart w-full lg:w-44 xl:w-52 flex items-center justify-center rounded-xl border-2 border-indigo-600 py-3 text-base font-medium text-indigo-600 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 gap-3"
                      onClick={handleCart}
                    >
                      <FaCartPlus className="text-lg" />
                      Add to Cart
                      {/*{isCartHoverVisible && <CartHover />}*/}
                    </button>

                    <button
                      type="submit"
                      className="buyNow w-full lg:w-44 xl:w-52 flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 gap-3"
                    >
                      <PiLightningFill className="text-lg" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
