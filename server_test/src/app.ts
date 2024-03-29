/*❗~~~~IMPORTS~~~~❗*/

// Importing the necessary modules
import express, {Application} from "express";
import bodyParser from "body-parser";

//Importing the Security
import compression from "compression";
import cookieParser from "cookie-parser";

//Importing the config
import globalErrorHandler from "../error/globalErrorHandler";
import passportSetup from "../auth/passport/passport.main";
import {configureSession} from "../session/session";
import configureCors from "../security/cors/cors";
import {setupMorgan} from "../morgan/morgan";
import {setupRouter} from "./router";
import {setupSecurity} from "../security/helmet/helmet";
import {webhookPermission} from "../webhook/wh-permission";

/*❗~~~~APP SETUP~~~~❗*/

// Initializing express app - This is the app object that will be used throughout the app
const app: Application = express();

//By using app.disable('x-powered-by'), the X-Powered-By header will not be sent with each HTTP response,
// making it less explicit which technology is being used to serve the application.
app.disable("x-powered-by");

// Middleware for handling CORS - This will handle CORS errors
configureCors(app);

// Middleware for setting security-related HTTP headers - This will set HTTP headers to secure the app
setupSecurity(app);

// Static files setup
app.use(express.static("public"));

// This will use it for webhooks
webhookPermission(app);

// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express.json());

// Middleware for parsing application/json - This will parse incoming requests with JSON payloads
//extended: false means you can parse strings or arrays only. extended: true means you can parse nested objects
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for parsing application/x-www-form-urlencoded - This will parse incoming requests with urlencoded payloads
app.use(bodyParser.json());

//Cookie parser used for cookies in the app - This will parse cookies in the app
app.use(cookieParser());

//Session setup for authentication
configureSession(app);

//Passport setup for authentication
passportSetup(app);

//Morgan for logging
setupMorgan(app);

// Middleware for compressing HTTP responses - This will compress HTTP responses to improve performance
app.use(compression());

// Routes setup
setupRouter(app);

//Middleware for handling errors - This will handle all errors
app.use(globalErrorHandler);

/*❗~~~~EXPORTS~~~~❗*/
export default app;
