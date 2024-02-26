import { useMutation, useQuery, useQueryClient } from "react-query";

import { fetchProductByIdQuery } from "@/api/product/fetch-product-by-id";
import { createProductQuery } from "@/api/product/create-product";
import { updateProductQuery } from "@/api/product/update-product";
import { fetchProductsByFiltersQuery } from "@/api/product/product-filter-sort-pagination-search";
import { Pagination } from "@/types/data/product/product-main-pc.type";
import { KeyFilter } from "@/types/utility/core/filter/filter.type";
import { SortOption } from "@/types/utility/core/sort/sort.type";

// Define your Filter, Sort, and Pagination types

// Fetch products by filters
export function useProductsByFilters({
  filter,
  sort,
  pagination,
  admin,
}: {
  filter: KeyFilter;
  sort: SortOption;
  pagination: Pagination;
  admin: boolean;
}) {
  return useQuery(
    ["products", filter, sort, pagination, admin],
    () => fetchProductsByFiltersQuery({ filter, sort, pagination, admin }),
    {
      staleTime: 120000,
      cacheTime: 180000,
    },
  );
}

// TODO:Fetch all store products
export function useAllStoreProducts() {
  const fetchAllStoreProductsQuery = async () => {};
  return useQuery("allProducts", fetchAllStoreProductsQuery);
}

// Fetch product by ID
export function useProductById(id: string) {
  return useQuery(["product", id], () => fetchProductByIdQuery(id));
}

// Create product (admin only)
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation(createProductQuery, {
    onSuccess: () => {
      queryClient
        .invalidateQueries("products")
        .then(() => {
          console.log("Products query invalidated and fetched successfully");
        })
        .catch((error) => {
          console.error(
            "Error invalidating and fetching products query:",
            error,
          );
        });
    },
  });
}

// Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation(updateProductQuery, {
    onSuccess: () => {
      queryClient
        .invalidateQueries("products")
        .then(() => {
          console.log("Products query invalidated and fetched successfully");
        })
        .catch((error) => {
          console.error(
            "Error invalidating and fetching products query:",
            error,
          );
        });
    },
  });
}
