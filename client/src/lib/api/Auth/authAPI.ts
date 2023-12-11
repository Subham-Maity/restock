import {LoginInfo, User, UserResponse} from "../../types/Auth/auth.type";
import {BASE_URL} from "@/lib/constant/constants";

export async function createUser(userData: User): Promise<{ data: User }> {
    try {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"content-type": "application/json"},
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const data = await response.json();
        return {data};
    } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

export async function checkUser(loginInfo: LoginInfo): Promise<UserResponse> {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await fetch(
                `${BASE_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify(loginInfo),
                    headers: {"content-type": "application/json"},
                }
            );
            if (response.ok) {
                const data = await response.json();
                resolve({data});
            } else {
                const error = await response.json();
                reject(error);
            }
        } catch (error: any) {
            reject(error);
        }
    });
}


export function signOut(userId: any): Promise<{ data: any }> {
    return new Promise(async (resolve) => {
        resolve({data: 'success'});
    });
}


