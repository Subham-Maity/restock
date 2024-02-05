import { deleteItemFromCart } from "@/api/cart/dalete-item-from-cart";
import { fetchItemsByUserId } from "@/api/cart/fetch-item-by-user";

export function resetCart(): Promise<{ status: "success"; data: any }> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserId();
      const items: any = response.data;
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({ status: "success", data: [] });
    } catch (error) {
      reject(error);
    }
  });
}

//We only use this for react-query hook

export async function resetCartQuery() {
  const response = await fetchItemsByUserId();
  const items: any = response.data;
  for (let item of items) {
    await deleteItemFromCart(item.id);
  }
  return { status: "success", data: [] };
}
