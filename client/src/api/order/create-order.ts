import { Order } from "@/types/data/order/order.type";
import { BASE_URL } from "@/constant/constants";

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
