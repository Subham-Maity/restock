import { CartItem } from "@/types/data/cart/cart.type";
import { BASE_URL } from "@/constant/constants";

export async function fetchItemsByUserId(): Promise<{ data: CartItem[] }> {
  const response = await fetch(`${BASE_URL}/cart`, {
    credentials: "include",
  });
  const data = await response.json();
  return { data };
}
