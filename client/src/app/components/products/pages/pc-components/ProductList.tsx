"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
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
  selectAllProducts,
  fetchProductsByFiltersAsync,
  selectTotalItems,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "@/app/components/products/pages/pc-components/productListSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { AppDispatch } from "@/lib/redux/store";
import { ITEMS_PER_PAGE } from "@/lib/redux/constants";

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
  const dispatch: AppDispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
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
        (el) => el === option.value,
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
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div>
      <MobileFilter
        handleFilter={handleFilter}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filters={filters}
      ></MobileFilter>

      <main className=" lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md dark:bg-[#25293c] shadow-xl dark:shadow-[#292045] shadow-[#f3f4f6] ring-1 ring-black bg-white ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <p
                            onClick={() => handleSort(option)}
                            className={classNames(
                              option.current
                                ? "cursor-pointer dark:hover:bg-[#343756] hover:bg-[#f3f4f6] text-gray-800 dark:text-[#d9d8ff] dark:bg-[#25293c ] dark:hover:text-[#7f70ff] "
                                : "cursor-pointer dark:hover:bg-[#343756] hover:bg-[#f3f4f6] text-gray-800 dark:text-[#d9d8ff] dark:bg-[#25293c ] dark:hover:text-[#7f70ff] ",
                              active ? "" : "",
                              "block px-4 py-2 text-sm",
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

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
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

          <div className="flex gap-x-4">
            <DesktopFilter
              handleFilter={handleFilter}
              filters={filters}
            ></DesktopFilter>

            <div className="">
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
                                ),
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
      <form className="hidden lg:block product-card p-4 w-96">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section: any) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-3 dark:text-white"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  {/*Here it is*/}
                  <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-black hover:text-gray-500 dark:hover:bg-[#34384e]  px-2 dark:text-white dark:hover:text-[#8669de]">
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
          <p className="text-sm text-gray-700">
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
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const ProductGrid = ({ products }: { products: any }) => {
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(
    null,
  );

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

  return (
    <>
      <div className="product-card">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-2">
          {products.map((product: any, index: number) => (
            <div
              className="group relative shadow-lg border-2 bg-white/30 dark:bg-black/20 border-gray-400/25 dark:border-gray-600/20 rounded-lg p-2 "
              key={product.id}
              onMouseEnter={() => setHoveredProductIndex(index)}
              onMouseLeave={() => setHoveredProductIndex(null)}
            >
              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <div className="w-full h-full">
                  <Link
                    href={`/pc-components-details/${product.id}`}
                    key={product.id}
                  >
                    <div>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                        height={300}
                        width={300}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </div>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <StarIcon className="w-6 h-6 inline"></StarIcon>
                    <span className=" align-bottom">{product.rating}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm block font-medium text-gray-900">
                    $
                    {Math.round(
                      product.price * (1 - product.discountPercentage / 100),
                    )}
                  </p>
                  <p className="text-sm block line-through font-medium text-gray-400">
                    ${product.price}
                  </p>
                </div>
              </div>
              {/* Render the carousel only when hovering over the product */}
              {hoveredProductIndex === index && (
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={hoveredProductIndex === index}
                  autoPlaySpeed={1000}
                  showDots={true}
                  arrows={false}
                  swipeable={true}
                  draggable={true}
                >
                  {product.images.map((image: string, imageIndex: number) => (
                    <Image
                      key={imageIndex}
                      src={image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                      height={300}
                      width={300}
                    />
                  ))}
                </Carousel>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
