import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5050, // You can remove the default value
  host: process.env.HOST || "localhost", // You can remove the default value
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000", // You can remove the default value
  db: process.env.MONGO_URL,
};

//✅ Port and CORS URL - Use in server.ts
export const port: string | number = process.env.PORT || 5050; // You can remove the default value
export const corsUrl: string = process.env.CORS_URL || "http://localhost:3000"; // You can remove the default value

export const Passport_Session_Secret =
  process.env.SESSION_SECRET || "keyboard cat";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET_KEY";

export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";

export const COOKIE_NAME = process.env.COOKIE_NAME || "jwt";
