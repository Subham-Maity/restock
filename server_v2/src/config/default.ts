import dotenv from "dotenv";

dotenv.config();

//❓ Check if the NODE_ENV is set, default to 'development'
const env = process.env.NODE_ENV || "development";

// Load environment variables from the corresponding .env file
if (env === "production") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

//✅ Port, Host, CORS Origin, and Database URL
export default {
  port: process.env.PORT || 5050,
  host: process.env.HOST || "localhost",
  corsOrigin: process.env.CORS_URL,
  db: process.env.MONGO_URL,
};
//✅ Passport Session Secret - Use in passport.ts
export const Passport_Session_Secret =
  process.env.SESSION_SECRET || "keyboard cat";

//✅ JWT Secret Key, JWT Expiration Time
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET_KEY";

export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";

//✅ Cookie Name - Use in cookie.config.ts
export const COOKIE_NAME = process.env.COOKIE_NAME || "jwt";
