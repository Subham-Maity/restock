import { BASE_URL } from "@/constant/constants";

export async function updateCart(update: any): Promise<{ data: any }> {
  const response = await fetch(`${BASE_URL}/cart/${update.id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  const data = await response.json();
  return { data };
}

//We only use this for react-query hook

export async function updateCartQuery(update: any) {
  const response = await fetch(`${BASE_URL}/cart/${update.id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
