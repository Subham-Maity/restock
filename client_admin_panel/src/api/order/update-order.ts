import { Order } from "@/types/data/order/order.type";
import { BASE_URL } from "@/constant/constants";

export function updateOrder(order: Order): Promise<{ data: Order }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/orders/` + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
      credentials: "include", // Add this line
    });
    const data = await response.json();
    resolve({ data });
  });
}
