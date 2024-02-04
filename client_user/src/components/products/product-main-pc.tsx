"use client";

import { useContext, useEffect, useState } from "react";
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
import Context from "@/store/context/context";
import { FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";
import { Pagination } from "@/components/core/pagination/pagination";
import { MobileFilter } from "@/components/core/filter/product-filter/mobile/product-filter";
import { IFilter, KeyFilter } from "@/types/utility/core/filter/filter.type";
import { DesktopFilter } from "@/components/core/filter/product-filter/desktop/product-filter";
import Sort from "@/components/core/sort/sort";
import { SortOption } from "@/types/utility/core/sort/sort.type";
import { ProductMainPcGrid } from "@/components/grid/products/product-main-pc-grid";
import { selectBrands } from "@/lib/features/brand/brand-slice";
import { selectCategories } from "@/lib/features/category/category-slice";
import { productPcSlice } from "@/lib/features/product/product-pc-async-thunk";
import { fetchBrandsAsync } from "@/lib/features/brand/brand-async-thunk";
import { fetchCategoriesAsync } from "@/lib/features/category/category-async-thunk";
import { useAppSelector } from "@/store/redux/useSelector";

export const PcComponentProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const brands = useAppSelector(selectBrands);
  const status = useAppSelector(selectProductListStatus);
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectAllProducts);
  const { isGrid, setIsGrid } = useContext(Context);
  const totalItems = useAppSelector(selectTotalItems);
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
  const handleFilter = (e: any, section: any, option: any) => {
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
    dispatch(productPcSlice({ filter, sort, pagination, admin: false }));
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

      <main className=" lg:mx-16 max-w-8xl lg:px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
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
              <ProductMainPcGrid products={products} status={status} />
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
