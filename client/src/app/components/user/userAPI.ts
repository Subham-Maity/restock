export async function fetchLoggedInUserOrders(userId: any) {
  const response = await fetch(
    "http://localhost:8080/orders/?user.id=" + userId,
  );
  const data = await response.json();
  return { data };
}
