"use client";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectProductById,
  selectTotalItems,
} from "@/lib/features/Product/fetchProductsByFiltersAsync";
import { AppDispatch } from "@/lib/redux/store";
import { ITEMS_PER_PAGE } from "@/lib/constant/constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { addToCartAsync } from "@/lib/features/Cart/cartSlice";
import { toast } from "react-toastify";
import { User } from "@/lib/types/Auth/auth.type";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";

import Context from "@/lib/context/Context";
import { FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductListSkeleton from "@/components/products/pages/pc-components/skeleton/ProductListSkeleton";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
  {
    name: "Discount: High to Low",
    sort: "discountPercentage",
    order: "desc",
    current: false,
  },
  {
    name: "Discount: Low to High",
    sort: "discountPercentage",
    order: "asc",
    current: false,
  },
];

interface Filter {
  [key: string]: string[];
}

interface SortOption {
  _sort: string;
  _order: string;

  [key: string]: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const PcComponentProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  console.log(products, "all products");

   console.log(categories, "all categories");
    console.log(brands, "all brands");
  const { isGrid, setIsGrid } = useContext(Context);
  const totalItems = useSelector(selectTotalItems);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const [filter, setFilter] = useState<Filter>({});
  const [sort, setSort] = useState<SortOption>({
    _sort: "rating",
    _order: "desc",
  } as SortOption);

  const [page, setPage] = useState(1);
  const handleFilter = (e: any, section: any, option: any) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (option: any) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page: number) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    console.log("here is ...", filter, sort, pagination);
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination ,admin:false}));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  if (!products) {
    return <ProductListSkeleton />;
  }
  const handleButtonClick = () => {
    setIsGrid(!isGrid);
  };
  return (
    <div>
      <MobileFilter
        handleFilter={handleFilter}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filters={filters}
      ></MobileFilter>

      <main className=" lg:mx-16 max-w-8xl lg:px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            New Arrivals
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-50 mt-8 w-48 origin-top-right bg-slate-200 dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-2xl font-semibold space-x-2">
                  <div className="">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <p
                            onClick={() => handleSort(option)}
                            className={classNames(
                              option.current ? "" : " rounded-2xl",
                              active ? "" : "",
                              "block py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-400 hover:dark:bg-gray-500 text-black dark:text-white"
                            )}
                          >
                            {option.name}
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div>
              <motion.button
                type="button"
                aria-label="Toggle Icon"
                className="text-2xl flex-shrink-0 rounded-full ml-4 bg-black/40 dark:bg-gray-600/40 hover:bg-black/60 p-2 text-white dark:hover:text-white dark:hover:bg-gray-500/40 drop focus:outline-none focus:ring-0 focus:ring-white/75 focus:ring-offset-0 focus:ring-offset-gray-800"
                whileTap={{
                  scale: 1,
                  rotate: 360,
                  transition: { duration: 0.4 },
                }}
                whileHover={{ scale: 1.1 }}
                onClick={handleButtonClick}
              >
                <span className="sr-only">Toggle Icon</span>
                {isGrid ? (
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FaListUl className="h-5 w-5" aria-hidden="true" />
                )}
              </motion.button>
            </div>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-12 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <DesktopFilter
              handleFilter={handleFilter}
              filters={filters}
            ></DesktopFilter>

            <div className="lg:col-span-3">
              <ProductGrid products={products}></ProductGrid>
            </div>
          </div>
        </section>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalItems}
        ></Pagination>
      </main>
    </div>
  );
};

export const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}: {
  mobileFiltersOpen: any;
  setMobileFiltersOpen: any;
  handleFilter: any;
  filters: any;
}) => {
  return (
    <>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white border-2 dark:bg-gradient-to-r dark:border-gray-800 dark:from-[#404043] dark:to-[#334053] rounded-lg">
                <div className="mt-[4.5rem] flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-[#2a2a2b]"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section: any) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-3 dark:dg-[#2f3349] dark:text-white "
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root ">
                            <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 hover:text-gray-500 dark:hover:bg-[#34384e] dark:hover:text-[#8669de]">
                              {/*Mobile text*/}
                              <span className="font-medium ">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map(
                                (option: any, optionIdx: any) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-white dark:hover:text-[#8669de]"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export const DesktopFilter = ({
  handleFilter,
  filters,
}: {
  handleFilter: any;
  filters: any;
}) => {
  return (
    <>
      <form className="hidden xl:block product-card ">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section: any) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b dark:border-gray-200 border-gray-800/25 py-8 dark:text-white px-8"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  {/*Here it is*/}
                  <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-black hover:text-gray-500 dark:hover:bg-[#34384e]  px-2 dark:text-white dark:hover:text-[#8669de] ">
                    <span className="font-medium">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option: any, optionIdx: any) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#8669de] "
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
};

function Pagination({ page, handlePage, totalItems }: any) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm ring-1 ring-inset ring-gray-400"
            aria-label="Pagination"
          >
            <div
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={() => handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 dark:text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export const ProductGrid = ({ products }: { products: any }) => {
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(
    null
  );
  const { isGrid } = useContext(Context);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnterWithDelay = useCallback((index: number) => {
    setHoverTimeout(
      setTimeout(() => {
        setHoveredProductIndex(index);
      }, 1000)
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
  const product = useSelector(selectProductById);
  const dispatch: AppDispatch = useDispatch();
  const user: User | null = useSelector(selectLoggedInUser);
  const handleCart = (e: any) => {
    e.preventDefault();
    const newItem = {
      ...product,
      quantity: 1,
      user: user ? user.id : "anonymous",
    };
    delete newItem["id"];

    dispatch(addToCartAsync(newItem))
      .then(() => {
        toast.success(`${product.title} is added to your cart`, {
          position: "top-right",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };
  const filteredProducts = products.filter(
    (product: { deleted: any }) => !product.deleted
  );
  return (
    <>
      {!isGrid ? (
        <>
          <div>
            {filteredProducts.map((product: any, index: number) => (
              <Link
                href={`/pc-components-details/${product.id}`}
                key={product.id}
              >
                <div
                  className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-2 mb-2 bg-white/30 dark:bg-black/20 border-gray-400/25 dark:border-gray-600/20 rounded-lg h-[200px] sm:h-[280px] w-full p-4"
                  key={product.id}
                  onMouseEnter={() => handleMouseEnterWithDelay(index)}
                  onMouseLeave={handleMouseLeave}
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
                      onClick={() => {
                        window.location.href = `/pc-components-details/${product.id}`;
                      }}
                    />
                  </div>
                  <div className="m-3 justify-start col-span-1 xs:col-span-2 lg:col-span-3 ">
                    <div className="product-details">
                      <h2 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-normal md:font-semibold lg:font-bold text-gray-800 dark:text-gray-100">
                        {product.title}
                      </h2>
                      <p className="text-sm text-justify text-gray-900 dark:text-gray-300 hidden mt-4 lg:flex">
                        {product.description}
                      </p>
                    </div>
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
                    <div className="price my-4">
                      <p className="text-xl font-semibold dark:text-gray-100 text-neutral-900">
                        ₹
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-base block line-through font-medium text-gray-400">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="product-card">
            <div className="grid grid-cols-2 p-4 gap-x-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredProducts.map((product: any, index: number) => (
                <Link
                  href={`/pc-components-details/${product.id}`}
                  key={product.id}
                >
                  <div
                    className="group relative lg:shadow-lg lg:border-2 lg:bg-white/30 lg:dark:bg-black/20 border-gray-400/25 dark:border-gray-600/20 rounded-lg pb-2"
                    key={product.id}
                    onMouseEnter={() => handleMouseEnterWithDelay(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="aspect-h-1 aspect-w-1 h-fit w-full overflow-hidden rounded-lg bg-gray-200 object-cover">
                      <div className="">
                        <div>
                          {hoveredProductIndex === index ? (
                            <Carousel
                              responsive={responsive}
                              infinite={true}
                              autoPlay={hoveredProductIndex === index}
                              autoPlaySpeed={1500}
                              showDots={false}
                              arrows={false}
                              swipeable={false}
                              draggable={false}
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
                                  />
                                )
                              )}
                            </Carousel>
                          ) : (
                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-full object-fill object-center"
                              fill
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
                              {product.rating.toFixed(1)}
                            </span>
                            <StarIcon className="w-3.5 text-sm text-gray-200" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium block dark:text-gray-100 text-neutral-900">
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                          ₹
                        </p>
                        <p className="text-md block line-through font-medium text-gray-400 pr-2">
                          {product.price}₹
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
