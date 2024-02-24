"use client";
import React, { useContext, useState } from "react";
import { Card } from "@/components/ui/shadcn/card";
import Context from "@/store/context/context";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Badge } from "@/components/ui/shadcn/badge";
import { set_max_price, title_max_length } from "@/constant/constants";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/shadcn/hover-card";

const ProductPreview = () => {
  const { product } = useContext(Context);
  function isValidUrl(url: any) {
    // Regular expression for validating URL
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  return (
    <div className="mt-12 sticky top-24 ">
      <Card className="default-card">
        <div className="mx-auto 2xl:mx-10 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
          {product && (
            <div className="pt-6">
              <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={1000}
              />

              <div className="flex flex-col lg:flex-row">
                {/* Image gallery */}
                <div className="w-fit flex flex-col-reverse lg:flex-row mx-auto py-4 sm:space-x-4 mb-10 justify-center lg:justify-start lg:border-r lg:border-gray-400 lg:pr-4 xl:pr-8">
                  <div className="flex flex-row lg:flex-col product-previews mt-3 lg:mt-0 space-x-2 lg:space-x-0 lg:space-y-2 p-2 border border-gray-400 rounded-xl h-fit w-fit mx-auto my-auto">
                    {/*TODO: map product.images to divs*/}

                    {/*{product.images.map((image: string, index: number) => (*/}
                    {/*  <div*/}
                    {/*    key={index}*/}
                    {/*    className="preview-image flex w-fit mx-auto"*/}
                    {/*    onMouseEnter={() => handleMouseEnter(image)}*/}
                    {/*  >*/}
                    {/*    <Image*/}
                    {/*      src={image}*/}
                    {/*      width={100}*/}
                    {/*      height={100}*/}
                    {/*      alt={product.title}*/}
                    {/*      className="rounded-lg border border-gray-400 hover:border-blue-400 h-[100px] w-[100px]"*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </div>
                  <div className="main-image w-fit h-fit lg:w-[400px] xl:w-[500px] my-auto">
                    <TransformWrapper>
                      {({ zoomIn, zoomOut, resetTransform }) => (
                        <React.Fragment>
                          <TransformComponent>
                            <Image
                              src={
                                isValidUrl(product.thumbnail)
                                  ? product.thumbnail
                                  : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                              }
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
                  <h1 className="justify-start text-2xl w-48 font-bold tracking-tight text-gray-900 break-words dark:text-gray-300 sm:text-3xl">
                    {product.title.substring(0, title_max_length)}
                  </h1>
                  <div>
                    <div className="space-y-4">
                      <p className="text-lg font-Comfortaa w-48 break-words text-justify text-gray-900 dark:text-gray-300">
                        {(product.description ?? "").substring(
                          0,
                          title_max_length,
                        )}
                        {product.description &&
                          product.description.length > title_max_length && (
                            <HoverCard>
                              <HoverCardTrigger className="text-md ml-2">
                                More
                              </HoverCardTrigger>
                              <HoverCardContent className="w-48 break-words text-sm justify-start default-card">
                                {product.description.substring(
                                  title_max_length,
                                )}
                              </HoverCardContent>
                            </HoverCard>
                          )}
                      </p>

                      {product.price !== 0 &&
                        product.price <= set_max_price && (
                          <>
                            <p
                              className={`text-3xl tracking-tight text-gray-900 dark:text-gray-300 ${
                                product.discountPercentage > 0
                                  ? "line-through font-medium dark:text-stone-600 text-stone-500"
                                  : ""
                              }`}
                            >
                              ₹ {product.price} /-
                            </p>
                            {product.discountPercentage > 0 && (
                              <p className="text-3xl font-medium block dark:text-gray-100 text-neutral-900">
                                ₹
                                {Math.min(
                                  Math.round(
                                    product.price *
                                      (1 - product.discountPercentage / 100),
                                  ),
                                  set_max_price,
                                )}
                              </p>
                            )}
                          </>
                        )}
                    </div>
                    <div className="flex justify-between gap-2 mt-6">
                      {product.stock > 0 ? (
                        <Badge>
                          stock: {Math.min(product.stock ?? 0, 100000000)}
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Out of stock</Badge>
                      )}

                      {product.brand && <Badge>brand: {product.brand}</Badge>}
                      {product.category && (
                        <Badge>category: {product.category}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductPreview;
