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

//✅ Port, Host, and Database URL
export default {
  port: process.env.PORT || 5050,
  host: process.env.HOST || "localhost",
  db: process.env.MONGO_URL,
};
