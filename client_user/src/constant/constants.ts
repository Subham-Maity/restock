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

// export const BASE_URL = "https://webcrack.online:6060/api/v1";
export const BASE_URL = "http://localhost:5050/api/v1";

export const bannerImages =
  "https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/4.jpg?raw=true";

export const logoImages = "";

export const admin_panel_url = "https://restock-admin.vercel.app";

//Strope payment

export const baseurl_stripe_redirect = "https://restock-commerce.vercel.app";
// export const baseurl_stripe_redirect = "http://http://localhost:3000";
