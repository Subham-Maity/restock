import { User } from "@/types/data/auth/auth.type";
import { BASE_URL } from "@/constant/constants";

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
