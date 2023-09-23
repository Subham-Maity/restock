export async function fetchLoggedInUserOrders(userId: any) {
  const response = await fetch(
    "https://restock-api.onrender.com/orders/?user.id=" + userId,
  );
  const data = await response.json();
  return { data };
}
