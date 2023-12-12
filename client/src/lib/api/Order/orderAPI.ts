import { Order } from "@/lib/types/Order/order.type";
import {
  Pagination,
  Sort,
} from "@/lib/types/Product/productList.type";
import {BASE_URL} from "@/lib/constant/constants";

export async function createOrder(order: Order): Promise<{ data: Order }> {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
}

export function updateOrder(order: Order): Promise<{ data: Order }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/orders/` + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(
  sort: Sort,
  pagination: Pagination,
): Promise<{ data: any }> {
  let queryString = '';

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
        `${BASE_URL}/orders?` + queryString
    );
    const data = await response.json();
    const totalOrders:any = await response.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
