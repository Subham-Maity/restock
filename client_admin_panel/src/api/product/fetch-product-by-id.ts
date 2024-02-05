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

//We only use this for react-query hook

export async function fetchProductByIdQuery(id: any) {
  const response = await fetch(`${BASE_URL}/products/` + id, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
