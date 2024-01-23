// password.utils.ts
import crypto from "crypto";
import { IUser } from "../../types/user/user";

export const verifyPassword = async (password: string, user: IUser) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      (err, hashedPassword) => {
        if (err) reject(err);
        resolve(crypto.timingSafeEqual(user.password, hashedPassword));
      },
    );
  });
};
