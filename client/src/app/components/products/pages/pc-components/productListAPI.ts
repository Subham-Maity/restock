import {
  Filter,
  Id,
  Pagination,
  Sort,
} from "@/app/components/products/pages/pc-components/productList.type";

export function fetchAllProducts(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch("https://restock-api.onrender.com/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id: Id): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://restock-api.onrender.com/products/" + id,
    );
    const data = await response.json();
    resolve({ data });
  });
}


export function createProduct(product: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://restock-api.onrender.com/products/",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(
  filter: Filter,
  sort: Sort,
  pagination: Pagination,
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

  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://restock-api.onrender.com/products?" + queryString,
    );
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({
      data: { products: data, totalItems: totalItems ? +totalItems : 0 },
    });
  });
}

export function fetchCategories(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch("https://restock-api.onrender.com/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch("https://restock-api.onrender.com/brands");
    const data = await response.json();
    resolve({ data });
  });
}
