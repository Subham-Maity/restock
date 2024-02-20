import { CookieOptions } from "express";
import config from "../../config/default";

//❓ Determine if the environment is production
export const isProduction = process.env.NODE_ENV === "production";

// Set the domain based on the environment
export const domain = isProduction ? config.host : "localhost";

export const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: "none",
  // domain,
};

export const COOKIE_NAME_SET = process.env.COOKIE_NAME || "jwt";
