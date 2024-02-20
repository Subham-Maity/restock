import { CookieOptions } from "express";
import config from "../../config/default";

//❓ Determine if the environment is production
export const isProduction = process.env.NODE_ENV === "production";

// Set the domain based on the environment
export const domain = isProduction ? config.host : "localhost";

export const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "none",
  maxAge: 1000 * 60 * 60 * 24 * 3,
  // domain,
};

export const COOKIE_NAME_SET = process.env.COOKIE_NAME || "jwt";
