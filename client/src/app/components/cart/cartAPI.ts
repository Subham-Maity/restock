import { CartItem } from "./cart.type";

export async function addToCart(item: CartItem): Promise<{ data: CartItem }> {
  const response = await fetch("https://restock-api.onrender.com/cart", {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
}

export async function fetchItemsByUserId(
  userId: string,
): Promise<{ data: CartItem[] }> {
  const response = await fetch(
    `https://restock-api.onrender.com/cart?user=${userId}`,
  );
  const data = await response.json();
  return { data };
}

export async function updateCart(
  update: CartItem,
): Promise<{ data: CartItem }> {
  const response = await fetch(
    `https://restock-api.onrender.com/cart/${update.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    },
  );
  const data = await response.json();
  return { data };
}

export async function deleteItemFromCart(
  itemId: string,
): Promise<{ data: { id: string } }> {
  const response = await fetch(
    `https://restock-api.onrender.com/cart/${itemId}`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    },
  );
  const data = await response.json();
  return { data: { id: itemId } };
}
