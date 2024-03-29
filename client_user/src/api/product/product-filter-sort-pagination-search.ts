import {
  Filter,
  Pagination,
  Sort,
} from "@/types/data/product/product-main-pc.type";
import { BASE_URL } from "@/constant/constants";

export function fetchProductsByFilters(
  filter: Filter,
  sort: Sort,
  pagination: Pagination,
  admin: boolean,
): Promise<{ data: { products: any; totalItems: number } }> {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products?` + queryString, {
      credentials: "include",
    });
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({
      data: { products: data, totalItems: totalItems ? +totalItems : 0 },
    });
  });
}

//We only use this for react-query hook

export async function fetchProductsByFiltersQuery({
  filter,
  sort,
  pagination,
  admin,
}: {
  filter: Filter;
  sort: Sort;
  pagination: Pagination;
  admin: boolean;
}) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }
  const response = await fetch(`${BASE_URL}/products?` + queryString, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const totalItems = response.headers.get("X-Total-Count");

  // Wrap the return value in a Promise
  return Promise.resolve({
    products: data,
    totalItems: totalItems ? +totalItems : 0,
  });
}
