import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //Token expiration time - 3 days
  httpOnly: true, // Cookie accessible only via HTTP(S)
  secure: false, // Set to true if you're using https
  sameSite: "strict", // Restricts cookie to same-site requests
  maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days cookie age after that it will be expired automatically
  // You can add more options like domain, path, etc., based on your needs
};
