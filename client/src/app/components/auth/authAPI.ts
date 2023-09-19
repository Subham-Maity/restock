import { LoginInfo, User, UserResponse } from "./auth.type";

export async function createUser(userData: User): Promise<{ data: User }> {
  try {
    const response = await fetch("https://restock-api.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
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

export async function checkUser(loginInfo: LoginInfo): Promise<UserResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;

      const response = await fetch(
        "https://restock-api.onrender.com/users?email=" + email,
      );
      const data = await response.json();

      if (data.length) {
        if (password === data[0].password) {
          const userData = { ...data[0] };
          delete userData.password;
          resolve({ data: userData });
        } else {
          reject({ message: "Wrong credentials" });
        }
      } else {
        reject({ message: "User not found" });
      }
    } catch (error) {
      reject({ message: "An error occurred while checking the user" });
    }
  });
}

export function updateUser(update: User) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://restock-api.onrender.com/users/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      },
    );
    const data = await response.json();
    resolve({ data });
  });
}
