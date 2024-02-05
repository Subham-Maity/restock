import { BASE_URL } from "@/constant/constants";
import { CartItem } from "@/types/redux-slice/cart/cart.slice.type";

export async function fetchItemsByUserId(): Promise<{ data: CartItem[] }> {
  const response = await fetch(`${BASE_URL}/cart`, {
    credentials: "include",
  });
  const data = await response.json();
  return { data };
}

//We only use this for react-query hook

export async function fetchItemsByUserIdQuery() {
  const response = await fetch(`${BASE_URL}/cart`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
