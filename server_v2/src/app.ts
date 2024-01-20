/*❗~~~~IMPORTS~~~~❗*/

// Importing the necessary modules
import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";

//Importing the Security
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

//Importing the widgets
import moment from "moment-timezone";
import morgan from "morgan";

import {v4 as uuidv4} from "uuid";

//Importing the error handler


//Importing the routes
import restock from "./routes";

//Importing the config
import {corsUrl} from "./config/default";
import globalErrorHandler from "./utils/errorHandler/globalErrorHandler";

/*❗~~~~CONFIG~~~~❗*/
// Loading environment variables from .env file
dotenv.config();

/*❗~~~~APP SETUP~~~~❗*/

// Initializing express app - This is the app object that will be used throughout the app
const app: Application = express();

//By using app.disable('x-powered-by'), the X-Powered-By header will not be sent with each HTTP response,
// making it less explicit which technology is being used to serve the application.
app.disable("x-powered-by");

// Middleware for handling CORS - This will handle CORS errors
app.use(
  cors({
    origin: corsUrl,
    optionsSuccessStatus: 200,
    exposedHeaders: ["X-Total-Count"], //for pagination
    credentials: true, //for cookies
  }),
);

// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express.json());

// Middleware for setting security-related HTTP headers - This will set HTTP headers to secure the app
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Middleware for logging HTTP requests - This will log HTTP requests to the console
app.use((req: any, _, next) => {
  req.id = uuidv4(); // Generates a unique ID for each request
  req.requestOrigin = req.headers.origin || req.headers.referer; // Retrieves the request origin from headers
  next(); // Passes control to the next middleware
});
morgan.token("id", function getId(req: any) {
  return req.id;
});

//json payload
app.use(express.json());

morgan.token("date", function (_, _res, tz) {
  return moment()
    .tz(<string>tz)
    .format("YYYY-MM-DD HH:mm:ss.SSS");
});

morgan.token("origin", function getOrigin(req: any) {
  return req.requestOrigin;
});

//Example: [1] c9uzb_V76qrKkV0EB6Zo0 - ::1 GET /api/v1/docs/favicon-32x32.png 304 3.050 ms - - 2023-12-09 17:02:13.971
//id-unique id , origin - origin of the request , remote-addr - IP address of the client , method - HTTP method ,
// url - URL of the request , status - HTTP status code , response-time - Time taken to respond in milliseconds ,
// res[content-length] - Content length of the response , date - Date and time of the request
app.use(
  morgan(
    ":id :origin :remote-addr :method :url :status :response-time ms - :res[content-length] :date[Asia/Kolkata]",
  ),
);

// Middleware for compressing HTTP responses - This will compress HTTP responses to improve performance
app.use(compression());

//Cookie parser used for cookies in the app - This will parse cookies in the app
app.use(cookieParser());

// Middleware for parsing application/x-www-form-urlencoded - This will parse incoming requests with urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Middleware for handling errors - This will handle all errors
app.use(globalErrorHandler);

/*❗~~~~ROUTES~~~~❗*/

//api - This signifies that the routes are part of the API (Application Programming Interface) of our application
//v1 - useful for versioning without breaking the existing API we can have multiple versions of the API

//Restock routes
app.use("/api/v1", restock.Product);
app.use("/api/v1", restock.user);
app.use("/api/v1", restock.order);
app.use("/api/v1", restock.category);
app.use("/api/v1", restock.brand);
app.use("/api/v1", restock.banner);
app.use("/api/v1", restock.auth);

// Default route for the API - This will be used to test if the API is live
app.get("/", (_: Request, res: Response) => {
  res.send("Yes you are connected to the app! 🚀");
});

/*❗~~~~EXPORTS~~~~❗*/
export default app;
