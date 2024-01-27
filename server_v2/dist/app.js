"use strict";
/*❗~~~~IMPORTS~~~~❗*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the necessary modules
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//Importing the Security
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//Importing the widgets
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const morgan_1 = __importDefault(require("morgan"));
const uuid_1 = require("uuid");
//Importing the error handler
//Importing the routes
const routes_1 = __importDefault(require("./routes"));
//Importing the config
const globalErrorHandler_1 = __importDefault(require("./utils/errorHandler/globalErrorHandler"));
const passport_main_1 = __importDefault(require("./security/passport/passport.main"));
const protected_1 = require("./services/protect/protected");
const default_1 = __importDefault(require("./config/default"));
const session_1 = require("./session/session");
/*❗~~~~CONFIG~~~~❗*/
// Loading environment variables from .env file
dotenv_1.default.config();
/*❗~~~~APP SETUP~~~~❗*/
// Initializing express app - This is the app object that will be used throughout the app
const app = (0, express_1.default)();
//Session setup for authentication
(0, session_1.configureSession)(app);
//Passport setup for authentication
(0, passport_main_1.default)(app);
//By using app.disable('x-powered-by'), the X-Powered-By header will not be sent with each HTTP response,
// making it less explicit which technology is being used to serve the application.
app.disable("x-powered-by");
// Middleware for handling CORS - This will handle CORS errors
app.use((0, cors_1.default)({
    origin: default_1.default.corsOrigin,
    optionsSuccessStatus: 200,
    exposedHeaders: ["X-Total-Count"],
    credentials: true,
}));
// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express_1.default.json());
// Middleware for setting security-related HTTP headers - This will set HTTP headers to secure the app
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Middleware for logging HTTP requests - This will log HTTP requests to the console
app.use((req, _, next) => {
    req.id = (0, uuid_1.v4)(); // Generates a unique ID for each request
    req.requestOrigin = req.headers.origin || req.headers.referer; // Retrieves the request origin from headers
    next(); // Passes control to the next middleware
});
morgan_1.default.token("id", function getId(req) {
    return req.id;
});
//json payload
app.use(express_1.default.json());
morgan_1.default.token("date", function (_, _res, tz) {
    return (0, moment_timezone_1.default)()
        .tz(tz)
        .format("YYYY-MM-DD HH:mm:ss.SSS");
});
morgan_1.default.token("origin", function getOrigin(req) {
    return req.requestOrigin;
});
//Example: [1] c9uzb_V76qrKkV0EB6Zo0 - ::1 GET /api/v1/docs/favicon-32x32.png 304 3.050 ms - - 2023-12-09 17:02:13.971
//id-unique id , origin - origin of the request , remote-addr - IP address of the client , method - HTTP method ,
// url - URL of the request , status - HTTP status code , response-time - Time taken to respond in milliseconds ,
// res[content-length] - Content length of the response , date - Date and time of the request
app.use((0, morgan_1.default)(":id :origin :remote-addr :method :url :status :response-time ms - :res[content-length] :date[Asia/Kolkata]"));
// Middleware for compressing HTTP responses - This will compress HTTP responses to improve performance
app.use((0, compression_1.default)());
//Cookie parser used for cookies in the app - This will parse cookies in the app
app.use((0, cookie_parser_1.default)());
// Middleware for parsing application/x-www-form-urlencoded - This will parse incoming requests with urlencoded payloads
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//Middleware for handling errors - This will handle all errors
app.use(globalErrorHandler_1.default);
/*❗~~~~ROUTES~~~~❗*/
//api - This signifies that the routes are part of the API (Application Programming Interface) of our application
//v1 - useful for versioning without breaking the existing API we can have multiple versions of the API
//Restock routes
app.use("/api/v1/products", protected_1.isAuth, routes_1.default.Product);
app.use("/api/v1/users", protected_1.isAuth, routes_1.default.user);
app.use("/api/v1/orders", routes_1.default.order);
app.use("/api/v1/categories", routes_1.default.category);
app.use("/api/v1/brands", routes_1.default.brand);
app.use("/api/v1/banner", routes_1.default.banner);
app.use("/api/v1/auth", routes_1.default.auth);
app.use("/api/v1/cart", protected_1.isAuth, routes_1.default.cart);
// Default route for the API - This will be used to test if the API is live
app.get("/", (_, res) => {
    res.send("Yes you are connected to the app! 🚀");
});
/*❗~~~~EXPORTS~~~~❗*/
exports.default = app;
