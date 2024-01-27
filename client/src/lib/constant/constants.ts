export const ITEMS_PER_PAGE = 20;

interface Item {
  price: number;
  discountPercentage: number;
}

export function discountedPrice(item: Item): number {
  return parseFloat(
    (item?.price * (1 - item?.discountPercentage / 100)).toFixed(2),
  );
}

export const BASE_URL = "https://restock-server-v2.onrender.com/api/v1";
// export const BASE_URL = "http://localhost:5050/api/v1";
