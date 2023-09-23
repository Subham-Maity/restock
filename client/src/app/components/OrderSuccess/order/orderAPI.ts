import { Order } from "@/app/components/OrderSuccess/order/order.type";

export async function createOrder(order: Order): Promise<{ data: Order }> {
  const response = await fetch("https://restock-api.onrender.com/orders", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
}
