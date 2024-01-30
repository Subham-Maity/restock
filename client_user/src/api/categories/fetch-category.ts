import { BASE_URL } from "@/constant/constants";

export function fetchCategories(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/categories`, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
