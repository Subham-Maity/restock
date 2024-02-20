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
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//Importing the config
const globalErrorHandler_1 = __importDefault(require("../error/globalErrorHandler"));
const passport_main_1 = __importDefault(require("../auth/passport/passport.main"));
const session_1 = require("../session/session");
const cors_1 = __importDefault(require("../security/cors/cors"));
const morgan_1 = require("../morgan/morgan");
const router_1 = require("./router");
const helmet_1 = require("../security/helmet/helmet");
const wh_permission_1 = require("../webhook/wh-permission");
/*❗~~~~APP SETUP~~~~❗*/
// Initializing express app - This is the app object that will be used throughout the app
const app = (0, express_1.default)();
//By using app.disable('x-powered-by'), the X-Powered-By header will not be sent with each HTTP response,
// making it less explicit which technology is being used to serve the application.
app.disable("x-powered-by");
// Middleware for handling CORS - This will handle CORS errors
(0, cors_1.default)(app);
// Middleware for setting security-related HTTP headers - This will set HTTP headers to secure the app
(0, helmet_1.setupSecurity)(app);
// Static files setup
app.use(express_1.default.static("public"));
// This will use it for webhooks
(0, wh_permission_1.webhookPermission)(app);
// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express_1.default.json());
// Middleware for parsing application/json - This will parse incoming requests with JSON payloads
//extended: false means you can parse strings or arrays only. extended: true means you can parse nested objects
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Middleware for parsing application/x-www-form-urlencoded - This will parse incoming requests with urlencoded payloads
app.use(body_parser_1.default.json());
//Cookie parser used for cookies in the app - This will parse cookies in the app
app.use((0, cookie_parser_1.default)());
//Session setup for authentication
(0, session_1.configureSession)(app);
//Passport setup for authentication
(0, passport_main_1.default)(app);
//Morgan for logging
(0, morgan_1.setupMorgan)(app);
// Middleware for compressing HTTP responses - This will compress HTTP responses to improve performance
app.use((0, compression_1.default)());
// Routes setup
(0, router_1.setupRouter)(app);
//Middleware for handling errors - This will handle all errors
app.use(globalErrorHandler_1.default);
/*❗~~~~EXPORTS~~~~❗*/
exports.default = app;
