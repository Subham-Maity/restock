import { BASE_URL } from "@/constant/constants";

export async function fetchLoggedInUser() {
  const response = await fetch(`${BASE_URL}/users/own`, {
    credentials: "include", // Add this line
  });

  const data = await response.json();
  return { data };
}
