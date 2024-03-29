import { BASE_URL } from "@/constant/constants";
import { CartItem } from "@/types/redux-slice/cart/cart.slice.type";

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

//We only use this for react-query hook
export async function addToCartQuery(item: CartItem) {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
