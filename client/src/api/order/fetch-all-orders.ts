import { Pagination, Sort } from "@/types/data/product/product-main-pc.type";
import { BASE_URL } from "@/constant/constants";

export function fetchAllOrders(
  sort: Sort,
  pagination: Pagination,
): Promise<{ data: any }> {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/orders?` + queryString, {
      credentials: "include", // Add this line
    });
    const data = await response.json();
    const totalOrders: any = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
