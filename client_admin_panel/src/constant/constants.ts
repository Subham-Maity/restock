export const ITEMS_PER_PAGE = 20;

export interface Item {
  price: number;
  discountPercentage: number;
}

export function discountedPrice(item: Item): number {
  return parseFloat(
    (item?.price * (1 - item?.discountPercentage / 100)).toFixed(2),
  );
}

//User can't set price more than 1000000
export const set_max_price = 1000000;
export const title_max_length = 100;

// export const BASE_URL = "https://webcrack.online:6060/api/v1";
export const BASE_URL = "http://localhost:5050/api/v1";

export const bannerImages =
  "https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/4.jpg?raw=true";
