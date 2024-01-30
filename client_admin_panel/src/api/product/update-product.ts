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
