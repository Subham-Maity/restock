/* IMPORTS */
// Importing the necessary modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { corsUrl } from "./config.js";
import Product from "./routes/products/product.router.js";
/* CONFIG */
// Loading environment variables from .env file
dotenv.config();
/* APP SETUP */
// Initializing express app - This is the app object that will be used throughout the app
const app = express();
// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express.json());
// Middleware for setting security-related HTTP headers - This will set HTTP headers to secure the app
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Middleware for logging HTTP requests - This will log HTTP requests to the console
app.use(morgan("common"));
// Middleware for parsing application/x-www-form-urlencoded - This will parse incoming requests with urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware for handling CORS - This will handle CORS errors
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
/* ROUTES */
//Product routes
app.use("/", Product);
// Default route for the API - This will be used to test if the API is live
app.get("/", (req, res) => {
    res.send("Yes you are connected to the app! ✅");
});
// Exporting the app
export default app;
//# sourceMappingURL=app.js.map