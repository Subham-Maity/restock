import { BASE_URL } from "@/constant/constants";

export async function fetchLoggedInUserOrders() {
  const response = await fetch(`${BASE_URL}/orders/own/`, {
    credentials: "include", // Add this line
  });
  const data = await response.json();
  return { data };
}
