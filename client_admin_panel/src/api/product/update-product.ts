import { BASE_URL } from "@/constant/constants";

export function updateProduct(update: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    // TODO: on the server, it will only return some info of the user (not password)
    resolve({ data });
  });
}

//We only use this for react-query hook

export async function updateProductQuery(update: any) {
  const response = await fetch(`${BASE_URL}/products/` + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
