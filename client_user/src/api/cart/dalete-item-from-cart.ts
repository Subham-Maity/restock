import { BASE_URL } from "@/constant/constants";

export async function deleteItemFromCart(
  itemId: string,
): Promise<{ data: { id: string } }> {
  const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  const data = await response.json();
  return { data: { id: itemId } };
}

//We only use this for react-query hook

export async function deleteItemFromCartQuery(itemId: string) {
  const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
