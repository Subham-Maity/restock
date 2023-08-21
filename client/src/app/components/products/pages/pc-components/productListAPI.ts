export async function fetchAllProducts(): Promise<{ data: any }> {
    const response: Response = await fetch("http://localhost:8080/products");
    const data = await response.json()
    return {data};
}