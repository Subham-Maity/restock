/* IMPORTS */
// Importing the necessary modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { corsUrl } from "./config.js";
import ProductRouter from "./routes/products/product.router.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
/* CONFIG */
// Loading environment variables from .env file
dotenv.config();
/* SWAGGER */
//Options for the swagger docs
const options = {
    definition: {
        restock: "3.0.0",
        info: {
            title: "Restock Ecommerce API",
            version: "1.0.0",
            description: "This is the most advanced ecommerce API",
        },
        servers: [
            {
                // url: "http://localhost:5050", //Local
                url: "http://193.160.119.92:5050", //Production
                // url: "https://restock-server.onrender.com/", //Testing
            },
        ],
    },
    apis: ["./src/routes/**/*.ts"],
};
const specs = swaggerJsDoc(options);
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
//api - This signifies that the routes are part of the API (Application Programming Interface) of our application
//v1 - useful for versioning without breaking the existing API we can have multiple versions of the API
//Product routes
app.use("/api/v1/products", ProductRouter);
//Swagger routes
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));
// Default route for the API - This will be used to test if the API is live
app.get("/", (req, res) => {
    res.send("Yes you are connected to the app! 🚀");
});
// Exporting the app
export default app;
//# sourceMappingURL=app.js.map