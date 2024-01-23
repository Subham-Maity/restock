"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./utils/logger/logger"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const swagger_1 = __importDefault(require("./utils/documentation/swagger"));
const default_1 = require("./config/default");
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const server = http_1.default.createServer(app_1.default);
(async () => {
    try {
        await (0, dbConnect_1.default)(); // Wait for DB connection
        logger_1.default.info("Connected to the database successfully.");
        server
            .listen(default_1.port, () => {
            (0, swagger_1.default)(app_1.default, default_1.port);
            logger_1.default.info(`Server live on: http://localhost:${default_1.port}`);
        })
            .on("error", (e) => {
            logger_1.default.error("Error occurred in the server:", e);
            process.exit(1); // Exit the process with failure code
        });
    }
    catch (error) {
        logger_1.default.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with failure code
    }
})();
