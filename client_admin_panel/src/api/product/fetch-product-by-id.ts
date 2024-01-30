import { BASE_URL } from "@/constant/constants";

export function fetchProductById(id: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/` + id, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
