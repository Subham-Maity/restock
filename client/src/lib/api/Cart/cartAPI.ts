import { CartItem } from "../../types/Cart/cart.type";
import {BASE_URL} from "@/lib/constant/constants";

export async function addToCart(item: CartItem): Promise<{ data: CartItem }> {
  const response = await fetch(`${BASE_URL}/cart`, {
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
      `${BASE_URL}/cart?user=${userId}`,
  );
  const data = await response.json();
  return { data };
}

export async function updateCart(
  update: any,
): Promise<{ data: any }> {
  const response = await fetch(
      `${BASE_URL}/cart/${update.id}`,
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
      `${BASE_URL}/cart/${itemId}`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    },
  );
  const data = await response.json();
  return { data: { id: itemId } };
}

export function resetCart(userId: string): Promise<{ status: "success"; data: any }> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserId(userId);
      const items:any = response.data;
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({ status: "success", data: [] });
    } catch (error) {
      reject(error);
    }
  });
}