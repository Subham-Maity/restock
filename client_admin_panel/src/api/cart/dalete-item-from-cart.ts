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
