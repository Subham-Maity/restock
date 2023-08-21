export async function fetchAllProducts(): Promise<{ data: any }> {
    const response: Response = await fetch("https://restock-api.onrender.com/products");
    const data = await response.json()
    return {data};
}