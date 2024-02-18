import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "@/store/context/context";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import Carousel from "react-multi-carousel";
import BgAdminTailwindWrapper from "@/wrapper/admin-bg-wrapper";
import { TbEditOff } from "react-icons/tb";
import { useRouter } from "next/navigation";

export const Grid = ({ products, status }: { products: any; status: any }) => {
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(
    null,
  );
  const { isGrid } = useContext(Context);
  const router = useRouter();
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnterWithDelay = useCallback((index: number) => {
    setHoverTimeout(
      setTimeout(() => {
        setHoveredProductIndex(index);
      }, 1000),
    );
  }, []);

  const handleMouseLeave = () => {
    if (hoverTimeout !== null) {
      clearTimeout(hoverTimeout);
    }
    setHoveredProductIndex(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout !== null) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const filteredProducts = products.filter(
    (product: { deleted: boolean }) => !product.deleted,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isGrid ? (
        <>
          <div>
            {products.map((product: any, index: number) => (
              <BgAdminTailwindWrapper key={index} className="mb-2">
                <div>
                  {product?.deleted && (
                    <p className="text-sm font-bold text-center bg-orange-100 mb-2 p-1 mx-1 rounded-lg block dark:text-red-400 text-red-600">
                      {" "}
                      This Product {product.id} is deleted
                    </p>
                  )}
                  {product.stock <= 0 && (
                    <div>
                      <p className="text-sm font-bold text-center bg-orange-100 mb-2 p-1 mx-1 rounded-lg block dark:text-red-400 text-red-600">
                        {product?.id} out Of stock
                      </p>
                    </div>
                  )}
                  {product?.stock && (
                    <p className="text-sm font-bold text-center bg-orange-100 mb-2 p-1 mx-1 rounded-lg block dark:text-red-400 text-red-600">
                      {" "}
                      {product?.id} out Of stock
                    </p>
                  )}
                  <div
                    className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-2 mb-2  border-gray-400/25 dark:border-gray-600/20 rounded-lg h-[200px] sm:h-[280px] w-full"
                    key={product.id}
                    onMouseEnter={() => handleMouseEnterWithDelay(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`admin-pc-components-details/${product.id}`}
                      key={product.id}
                    >
                      <div className="w-full h-full ">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-fill object-center rounded-lg"
                          // fill
                          width={500}
                          height={500}
                          unoptimized
                        />
                      </div>
                    </Link>

                    <div className="m-3 justify-start col-span-1 xs:col-span-2 lg:col-span-3 ">
                      <Link
                        href={`admin-pc-components-details/${product.id}`}
                        key={product.id}
                      >
                        <div className="product-details">
                          <h2 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-normal md:font-semibold lg:font-bold text-gray-800 dark:text-gray-100">
                            {product.title}
                          </h2>
                          <p className="text-sm text-justify text-gray-900 dark:text-gray-300 hidden mt-4 lg:flex">
                            {product.description}
                          </p>
                        </div>
                      </Link>
                      <Link
                        href={`admin-pc-components-details/${product.id}`}
                        key={product.id}
                      >
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
                              {product.rating}
                            </span>
                            <StarIcon className="w-3.5 text-sm text-gray-200" />
                          </div>
                        </div>
                      </Link>
                      <Link
                        href={`/admin-pc-components-details/${product.id}`}
                        key={product.id}
                      >
                        <div className="price my-4">
                          <p className="text-xl font-semibold dark:text-gray-100 text-neutral-900">
                            ₹
                            {Math.round(
                              product.price *
                                (1 - product.discountPercentage / 100),
                            )}
                          </p>
                          <p className="text-base block line-through font-medium text-gray-400">
                            ₹{product.price}
                          </p>
                        </div>
                      </Link>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex rounded-md bg-blue-800 hover:bg-blue-500 mt-2 ml-2 dark:bg-cyan-700/60 px-1 py-1 text-sm font-semibold text-white shadow-sm dark:hover:bg-cyan-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          onClick={() => {
                            // router.push(`/admin/editForm/${product.id}`);
                          }}
                        >
                          <TbEditOff className="mt-0.5 mr-1" />
                          Edit Your Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </BgAdminTailwindWrapper>
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products.map((product: any, index: number) => (
                <BgAdminTailwindWrapper key={index}>
                  <div key={index}>
                    <Link
                      href={`/product-t1-details/${product.id}?showDialog=y`}
                      key={product.id}
                    >
                      {product.deleted && (
                        <p className="text-sm font-bold text-center bg-orange-100 p-1 mx-1 rounded-lg block dark:text-red-400 text-red-600">
                          {" "}
                          This Product {product.id} is deleted
                        </p>
                      )}
                      <div
                        className="group relative"
                        key={product.id}
                        onMouseEnter={() => handleMouseEnterWithDelay(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <div className="w-full h-full">
                            <div>
                              {hoveredProductIndex === index ? (
                                <Carousel
                                  responsive={responsive}
                                  infinite={true}
                                  autoPlay={hoveredProductIndex === index}
                                  autoPlaySpeed={1500}
                                  showDots={false}
                                  arrows={false}
                                  swipeable={true}
                                  draggable={true}
                                >
                                  {product.images.map(
                                    (image: string, imageIndex: number) => (
                                      <Image
                                        key={imageIndex}
                                        src={image}
                                        alt={product.title}
                                        className="w-[300px] h-[300px] object-fill object-center"
                                        height={300}
                                        width={300}
                                        onClick={() => {
                                          router.push(
                                            `/product-t1-details/${product.id}`,
                                          );
                                        }}
                                      />
                                    ),
                                  )}
                                </Carousel>
                              ) : (
                                <Image
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="w-full h-full object-fill object-center"
                                  fill
                                  onClick={() => {
                                    window.location.href = `/product-t1-details/${product.id}`;
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm px-2">
                              <div className="text-gray-800 dark:text-gray-300">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 "
                                />
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
                                <span className="text-white text-sm">
                                  {product.rating}
                                </span>
                                <StarIcon className="w-3.5 text-sm text-gray-200" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium block dark:text-gray-100 text-neutral-900">
                              ₹
                              {Math.round(
                                product.price *
                                  (1 - product.discountPercentage / 100),
                              )}
                            </p>
                            <p className="text-md block line-through font-medium text-gray-400 pr-2">
                              ₹{product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex rounded-md bg-blue-800 hover:bg-blue-500 mt-2 ml-2 dark:bg-cyan-700/60 px-1 py-1 text-sm font-semibold text-white shadow-sm dark:hover:bg-cyan-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={() => {
                          router.push(
                            `product-t1-edit-form/${product.id}?showDialog=y`,
                          );
                        }}
                      >
                        <TbEditOff className="mt-0.5 mr-1" />
                        Edit Your Product
                      </button>
                    </div>
                  </div>
                </BgAdminTailwindWrapper>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
