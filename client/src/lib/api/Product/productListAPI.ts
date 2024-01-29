import { Filter, Pagination, Sort } from "@/lib/types/Product/productList.type";
import { BASE_URL } from "@/lib/constant/constants";

export function fetchAllProducts(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products`, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/` + id, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    // TODO: on the server, it will only return some info of the user (not password)
    resolve({ data });
  });
}

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

export function fetchCategories(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/categories`, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/brands`, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
