import { User } from "@/types/data/auth/auth.type";
import { BASE_URL } from "@/constant/constants";

export async function createUser(userData: User): Promise<{ data: User }> {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
      credentials: "include", // Add this line
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}
