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

//We only use this for react-query hook
export async function fetchCategoriesQuery() {
  const response = await fetch(`${BASE_URL}/categories`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
