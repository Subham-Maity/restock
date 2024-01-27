import { User } from "@/lib/types/Auth/auth.type";
import { BASE_URL } from "@/lib/constant/constants";

export async function fetchLoggedInUserOrders(userId: any) {
  const response = await fetch(`${BASE_URL}/orders/user/` + userId, {
    credentials: "include", // Add this line
  });
  const data = await response.json();
  return { data };
}

export async function fetchLoggedInUser() {
  const response = await fetch(`${BASE_URL}/users/own`, {
    credentials: "include", // Add this line
  });

  const data = await response.json();
  return { data };
}

export async function updateUser(update: User): Promise<{ data: User }> {
  try {
    const response = await fetch(`${BASE_URL}/users/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}
