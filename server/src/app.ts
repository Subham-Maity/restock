/*❗~~~~IMPORTS~~~~❗*/

// Importing the necessary modules
import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";

//Importing the Security
import cors from "cors";
import {corsUrl} from "./config.js";
import dotenv from "dotenv";
import helmet from "helmet";


//Importing the widgets
import moment from "moment-timezone";
import { nanoid } from 'nanoid';
import morgan from "morgan";

//Importing the error handler
import globalErrorHandler from './utils/globalErrorHandler.js';

//Importing the routes
import ProductRouter from "./routes/products/product.routes.js"
import BrandRouter from "./routes/brands/brand.routes.js"
import CategoryRouter from "./routes/category/category.routes.js"
import UserRouter from "./routes/user/user.routes.js"
import AuthRouter from "./routes/auth/auth.routes.js"
import CartRouter from "./routes/cart/cart.routes.js"
import OrderRouter from "./routes/order/order.routes.js"
import BannerRouter from "./routes/banner/banner.routes.js"


/*❗~~~~CONFIG~~~~❗*/
// Loading environment variables from .env file
dotenv.config();



/*❗~~~~APP SETUP~~~~❗*/

// Initializing express app - This is the app object that will be used throughout the app
const app: Application = express();


// Middleware for handling CORS - This will handle CORS errors
app.use(cors({
    origin: corsUrl,
    optionsSuccessStatus: 200,
    exposedHeaders: ['X-Total-Count']
}));

// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express.json());

// Middleware for setting security-related HTTP headers - This will set HTTP headers to secure the app
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// Middleware for logging HTTP requests - This will log HTTP requests to the console
app.use((req:any, res, next) => {
    req.id = nanoid(); // Generates a unique ID for each request
    req.requestOrigin = req.headers.origin || req.headers.referer; // Retrieves the request origin from headers
    next(); // Passes control to the next middleware
});
morgan.token('id', function getId(req:any) {
    return req.id;
});

morgan.token('date', function(req, res, tz) {
    return moment().tz(<string>tz).format('YYYY-MM-DD HH:mm:ss.SSS');
});

morgan.token('origin', function getOrigin(req:any) {
    return req.requestOrigin;
});

//Example: [1] c9uzb_V76qrKkV0EB6Zo0 - ::1 GET /api/v1/docs/favicon-32x32.png 304 3.050 ms - - 2023-12-09 17:02:13.971
//id-unique id , origin - origin of the request , remote-addr - IP address of the client , method - HTTP method ,
// url - URL of the request , status - HTTP status code , response-time - Time taken to respond in milliseconds ,
// res[content-length] - Content length of the response , date - Date and time of the request
app.use(morgan(':id :origin :remote-addr :method :url :status :response-time ms - :res[content-length] :date[Asia/Kolkata]'));


// Middleware for parsing application/x-www-form-urlencoded - This will parse incoming requests with urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//Middleware for handling errors - This will handle all errors
app.use(globalErrorHandler);




/*❗~~~~ROUTES~~~~❗*/

//api - This signifies that the routes are part of the API (Application Programming Interface) of our application
//v1 - useful for versioning without breaking the existing API we can have multiple versions of the API

//Product routes
app.use("/api/v1/products", ProductRouter)
//Brand routes
app.use("/api/v1/brands", BrandRouter)
//Category routes
app.use("/api/v1/categories", CategoryRouter)
//User routes
app.use("/api/v1/users", UserRouter)
//Auth routes
app.use("/api/v1/auth", AuthRouter)
//Cart routes
app.use("/api/v1/cart", CartRouter)
//Order routes
app.use("/api/v1/orders", OrderRouter)
app.use("/api/v1/banner", BannerRouter)


// Default route for the API - This will be used to test if the API is live
app.get("/", (req: Request, res: Response) => {
    res.send("Yes you are connected to the app! 🚀");
});


/*❗~~~~EXPORTS~~~~❗*/
export default app;
