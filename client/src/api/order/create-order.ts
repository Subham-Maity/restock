import { BASE_URL } from "@/constant/constants";
import { Order } from "@/types/redux-slice/order/order.slice.type";

export async function createOrder(order: Order): Promise<{ data: Order }> {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "content-type": "application/json" },
    credentials: "include", // Add this line
  });
  const data = await response.json();
  return { data };
}
