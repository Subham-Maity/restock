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
