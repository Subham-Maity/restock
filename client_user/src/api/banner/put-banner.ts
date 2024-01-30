import { BASE_URL } from "@/constant/constants";

export function putBanner(product: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
