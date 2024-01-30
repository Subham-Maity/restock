import { CartItem } from "@/types/data/cart/cart.type";
import { BASE_URL } from "@/constant/constants";

export async function addToCart(item: CartItem): Promise<{ data: CartItem }> {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  const data = await response.json();
  return { data };
}
