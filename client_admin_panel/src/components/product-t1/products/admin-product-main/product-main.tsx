"use client";

import React, { useContext, useEffect, useState } from "react";

import { FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";

import { useDispatch } from "react-redux";
import {
  fetchProductsByFilters,
  selectAllProducts,
  selectProductListStatus,
  selectTotalItems,
  setLoading,
} from "@/lib/features/product/product-pc-slice";
import { AppDispatch } from "@/store/redux/store";
import { ITEMS_PER_PAGE } from "@/constant/constants";
import "react-multi-carousel/lib/styles.css";
import BgAdminTailwindWrapper from "@/wrapper/admin-bg-wrapper";
import Context from "@/store/context/context";
import { FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";

import { selectBrands, setBrands } from "@/lib/features/brand/brand-slice";
import {
  selectCategories,
  setCategories,
} from "@/lib/features/category/category-slice";
import { fetchProductsByFiltersAsync } from "@/lib/features/product/product-pc-async-thunk";
import { DesktopFilter } from "@/components/product-t1/core/filter/desktop/product-filter";
import { MobileFilter } from "@/components/product-t1/core/filter/mobile/product-filter";
import { Grid } from "@/components/product-t1/grid/admin/grid";
import { IFilter, KeyFilter } from "@/types/utility/core/filter/filter.type";
import { useAppSelector } from "@/store/redux/useSelector";
import { useProductsByFilters } from "@/lib/features/product/product-react-query";
import { useBrands } from "@/lib/features/brand/brand-react-query";
import { useCategory } from "@/lib/features/category/category-react-query";
import Sort from "@/components/product-t1/core/sort/sort";
import { PaginationPage } from "@/components/product-t1/core/pagination/pagination";
import AdminActionCreate from "@/components/product-t1/products/admin-action/admin-action-create";
import { SortOption } from "@/types/utility/core/sort/sort.type";
import { ResponsiveHeading } from "@/components/ui/typography/typography";

export const AdminPcComponentProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  //react query
  const brands = useAppSelector(selectBrands);
  const status = useAppSelector(selectProductListStatus);

  //react query
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectAllProducts);
  const { isGrid, setIsGrid } = useContext(Context);
  const totalItems = useAppSelector(selectTotalItems);
  const { data: brandsData, status: brandsStatus } = useBrands();
  const { data: categoryData, status: categoryStatus } = useCategory();

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
  const [filter, setFilter] = useState<KeyFilter>({});
  const [sort, setSort] = useState<SortOption>({
    _sort: "rating",
    _order: "desc",
  } as SortOption);

  const [page, setPage] = useState(1);
  const pagination = { _page: page, _limit: ITEMS_PER_PAGE };

  const { data: productsData, status: productsStatus } = useProductsByFilters({
    filter,
    sort,
    pagination,
    admin: true,
  });
  const handleFilter = (e: any, section: any, option: any) => {
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

  const handleSort = (option: any) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({ filter, sort, pagination, admin: true }),
    );
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  //If we use a React query, then we will use this useEffect
  useEffect(() => {
    if (productsStatus === "loading") {
      dispatch(setLoading());
    }
    if (productsStatus === "success") {
      dispatch(fetchProductsByFilters(productsData.products));
    }
  }, [dispatch, productsData, productsStatus, filter, sort, page]);

  useEffect(() => {
    if (brandsStatus === "loading") {
      dispatch(setLoading());
    }
    if (brandsStatus === "success") {
      dispatch(setBrands(brandsData));
    }
  }, [dispatch, brandsData, brandsStatus]);

  useEffect(() => {
    if (categoryStatus === "loading") {
      dispatch(setLoading());
    }
    if (categoryStatus === "success") {
      dispatch(setCategories(categoryData));
    }
  }, [dispatch, categoryData, categoryStatus]);
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
        </BgAdminTailwindWrapper>

        <section aria-labelledby="products-heading" className="pb-2 pt-2">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <AdminActionCreate />
          <div className="grid grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-4 mt-2">
            <BgAdminTailwindWrapper>
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>
            </BgAdminTailwindWrapper>

            <div className="lg:col-span-3">
              <Grid products={products} status={status} />
            </div>
          </div>
        </section>
        <BgAdminTailwindWrapper>
          <PaginationPage
            page={page}
            handlePage={handlePage}
            totalItems={totalItems}
          ></PaginationPage>
        </BgAdminTailwindWrapper>
      </main>
    </div>
  );
};
