"use client";

import React, { useContext, useEffect, useState } from "react";

import { FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";

import { useDispatch } from "react-redux";
import {
  selectAllProducts,
  selectProductListStatus,
  selectTotalItems,
} from "@/lib/features/product/product-pc-slice";
import { AppDispatch } from "@/store/redux/store";
import { ITEMS_PER_PAGE } from "@/constant/constants";
import "react-multi-carousel/lib/styles.css";
import BgAdminTailwindWrapper from "@/wrapper/admin-bg-wrapper";
import Context from "@/store/context/context";
import { FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";
import { Pagination } from "@/components/core/pagination/pagination";
import { selectBrands } from "@/lib/features/brand/brand-slice";
import { selectCategories } from "@/lib/features/category/category-slice";
import { fetchBrandsAsync } from "@/lib/features/brand/brand-async-thunk";
import { fetchCategoriesAsync } from "@/lib/features/category/category-async-thunk";
import { productPcSlice } from "@/lib/features/product/product-pc-async-thunk";
import ProductForm from "@/components/update/products/update-pc-product-form";
import { DesktopFilter } from "../core/filter/product-filter/desktop/product-filter";
import { MobileFilter } from "@/components/core/filter/product-filter/mobile/product-filter";
import { ProductMainPcGrid } from "@/components/grid/products/product-main-pc-grid";
import Sort from "@/components/core/sort/sort";
import { IFilter } from "@/types/utility/core/filter/filter.type";
import { useAppSelector } from "@/store/redux/useSelector";

interface Filter {
  [key: string]: string[];
}

interface SortOption {
  _sort: string;
  _order: string;

  [key: string]: any;
}

export const AdminPcComponentProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const brands = useAppSelector(selectBrands);
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductListStatus);
  const totalItems = useAppSelector(selectTotalItems);
  const { isGrid, setIsGrid } = useContext(Context);
  const filters: IFilter[] = [
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
    dispatch(productPcSlice({ filter, sort, pagination, admin: true }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);
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

      <main className=" max-w-8xl">
        <BgAdminTailwindWrapper>
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-2 lg:pt-0 pb-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Sort sort={sort} handleSort={handleSort} />

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
        </BgAdminTailwindWrapper>

        <section aria-labelledby="products-heading" className="pb-2 pt-2">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <BgAdminTailwindWrapper>
            <div className="">
              <div>
                <button
                  className="btn inline-flex rounded-md bg-green-600  dark:text-gray-200 hover:bg-green-500 dark:bg-green-700/60 px-4 py-1 text-lg font-semibold text-white shadow-sm dark:hover:bg-green-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={() =>
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    ).showModal()
                  }
                >
                  Add New Product
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box max-w-fit bg-gray-200 dark:bg-gray-800">
                    <ProductForm />
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-20 top-14 text-2xl font-extrabold">
                          ✕
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </BgAdminTailwindWrapper>
          <div className="grid grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-4 mt-2">
            <BgAdminTailwindWrapper>
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>
            </BgAdminTailwindWrapper>

            <div className="lg:col-span-3">
              <ProductMainPcGrid products={products} status={status} />
            </div>
          </div>
        </section>
        <BgAdminTailwindWrapper>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </BgAdminTailwindWrapper>
      </main>
    </div>
  );
};
