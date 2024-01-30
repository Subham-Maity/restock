import { BASE_URL } from "@/constant/constants";

export function fetchBrands(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/brands`, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
