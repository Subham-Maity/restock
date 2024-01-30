import { LoginInfo, UserResponse } from "@/types/data/auth/auth.type";
import { BASE_URL } from "@/constant/constants";

export async function checkUser(loginInfo: LoginInfo): Promise<UserResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Add this line
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      reject(error);
    }
  });
}
