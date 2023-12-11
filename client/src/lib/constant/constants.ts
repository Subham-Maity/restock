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

// Testing Server (For Frontend)
// export const BASE_URL = "https://restock-api.onrender.com";

// Testing Server (For Backend & Frontend)
// export const BASE_URL = "https://restock-server.onrender.com/";

// Local Server
export const BASE_URL = "http://localhost:5050/api/v1"

// Production Server
// export const BASE_URL = "http://localhost:5050/";
