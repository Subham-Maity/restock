"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//❓ Check if the NODE_ENV is set, default to 'development'
const env = process.env.NODE_ENV || "development";
// Load environment variables from the corresponding .env file
if (env === "production") {
    dotenv_1.default.config({ path: ".env.prod" });
}
else {
    dotenv_1.default.config({ path: ".env.dev" });
}
//✅ Port, Host, and Database URL
exports.default = {
    port: process.env.PORT || 5050,
    host: process.env.HOST,
    db: process.env.MONGO_URL,
};
