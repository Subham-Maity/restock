"use client";

import React, { useContext, useEffect, useState } from "react";

import { FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";

import { useDispatch } from "react-redux";
import {
  fetchProductsByFilters,
  selectAllProducts,
  selectProductListStatus,
  setLoading,
  setTotalItems,
} from "@/lib/features/product/product-pc-slice";
import { AppDispatch } from "@/store/redux/store";
import { ITEMS_PER_PAGE } from "@/constant/constants";
import "react-multi-carousel/lib/styles.css";
import Context from "@/store/context/context";
import { FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";

import { selectBrands, setBrands } from "@/lib/features/brand/brand-slice";
import {
  selectCategories,
  setCategories,
} from "@/lib/features/category/category-slice";
import { DesktopFilter } from "@/components/product-t1/core/filter/desktop/product-filter";
import { MobileFilter } from "@/components/product-t1/core/filter/mobile/product-filter";
import { IFilter, KeyFilter } from "@/types/utility/core/filter/filter.type";
import { useAppSelector } from "@/store/redux/useSelector";
import { useProductsByFilters } from "@/lib/features/product/product-react-query";
import { useBrands } from "@/lib/features/brand/brand-react-query";
import { useCategory } from "@/lib/features/category/category-react-query";
import Sort from "@/components/product-t1/core/sort/sort";
import ActionCreate from "@/components/product-t1/products/list/admin/action/action-create";
import { SortOption } from "@/types/utility/core/sort/sort.type";
import { ResponsiveHeading } from "@/components/ui/typography/typography";
import { PaginationPage } from "@/components/product-t1/core/pagination/pagination";
import { useSearchParams } from "next/navigation";
import ActionDeleteProductTab from "@/components/product-t1/products/list/admin/action/action-delete-product-tab";

export const AdminPcComponentProductList = () => {
  /**���������Dispatch For Redux Store���������*/
  const dispatch: AppDispatch = useDispatch();

  /**���������Selector for Data from Redux Store���������*/
  const brands = useAppSelector(selectBrands);
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectProductListStatus);
  const products = useAppSelector(selectAllProducts);

  /**���������(*!Admin ONlY:)Filtering the products���������*/
  const allProducts = products;

  const deletedProducts = products.filter(
    (product: { deleted: boolean }) => product.deleted,
  );
  const normalProducts = products.filter(
    (product: { deleted: boolean }) => !product.deleted,
  );

  /**���������States for holding the current component state���������*/
  /*Filter State */
  //option available for filter
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

  /*for view state*/
  const { isGrid, setIsGrid } = useContext(Context);

  /*filter state*/
  const [filter, setFilter] = useState<KeyFilter>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /*Sort State*/
  const [sort, setSort] = useState<SortOption>({
    _sort: "rating",
    _order: "desc",
  } as SortOption);

  /*pagination State*/
  //use for search params to get the page number
  const searchParams = useSearchParams();
  const page = searchParams.get("_page");

  // set the page number if not then default is 1
  const pagination = {
    _page: page ? parseInt(page) : 1,
    _limit: ITEMS_PER_PAGE,
  };

  /**���������Handle Operations for passing the value to fetch function���������*/
  /*Sort Operation*/
  //Purpose: To sort the products by price, rating, and date
  const handleSort = (option: SortOption) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  /*Filter Operation*/
  //Purpose: To filter the products by category and brand
  // and take the filter option and set the filter state
  const handleFilter = (
    e: { target: { checked: any } },
    section: { id: string | number },
    option: { checked: any; value: string },
  ) => {
    const newFilter = { ...filter };
    // If e is null, it means the function was called from onSelect
    const isChecked = e ? e.target.checked : !option.checked;
    if (isChecked) {
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
    setFilter(newFilter);
  };

  /*Gird change Operation*/
  const handleButtonClick = () => {
    setIsGrid(!isGrid);
  };

  /**���������Fetching Operations���������*/
  /*Fetch all products by filters (filter, sort, pagination and admin) in redux using a React query*/
  const { data: productData, status: productStatus } = useProductsByFilters({
    filter,
    sort,
    pagination,
    admin: true,
  });

  /*Fetch all brands using a React query*/
  const { data: brandsData, status: brandsStatus } = useBrands();

  /*Fetch all categories using a React query*/
  const { data: categoryData, status: categoryStatus } = useCategory();

  /**���������Set data in redux using a React query���������*/
  useEffect(() => {
    if (productStatus === "loading") {
      dispatch(setLoading());
    }
    if (productStatus === "success") {
      dispatch(fetchProductsByFilters(productData.data.products));
      dispatch(setTotalItems(productData.data.totalItems));
    }
  }, [dispatch, productData, productStatus, filter, sort, page]);

  /**Brands and Categories set in redux using a React query*/
  useEffect(() => {
    if (brandsStatus === "loading" || categoryStatus === "loading") {
      dispatch(setLoading());
    }
    if (brandsStatus === "success") {
      dispatch(setBrands(brandsData));
    }
    if (categoryStatus === "success") {
      dispatch(setCategories(categoryData));
    }
  }, [dispatch, brandsData, brandsStatus, categoryData, categoryStatus]);

  return (
    <div>
      <MobileFilter
        handleFilter={handleFilter}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filters={filters}
        status={status}
      ></MobileFilter>

      <main className=" max-w-8xl">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-2 lg:pt-0 pb-2">
          <ResponsiveHeading className="dark:text-[#919eab] text-[#837c78]">
            Admin
          </ResponsiveHeading>

          <div className="flex items-center">
            <Sort handleSort={handleSort} />

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

        <section aria-labelledby="products-heading" className="pb-2 pt-2">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <ActionCreate />

          <div className="grid grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-4 mt-2">
            <DesktopFilter
              handleFilter={handleFilter}
              filters={filters}
              status={status}
            />

            <div className="lg:col-span-3">
              <ActionDeleteProductTab
                status={status}
                allProducts={allProducts}
                deletedProducts={deletedProducts}
                normalProducts={normalProducts}
              />
            </div>
          </div>
        </section>
        <PaginationPage />
      </main>
    </div>
  );
};
