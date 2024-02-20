"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger/logger"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const swagger_1 = __importDefault(require("../services/swagger/swagger"));
require("../logs");
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const default_1 = __importDefault(require("../config/default"));
const server = http_1.default.createServer(app_1.default);
(async () => {
    try {
        // Wait for DB connection to be established
        await (0, dbConnect_1.default)();
        logger_1.default.info("Connected to the database successfully.");
        server
            .listen(default_1.default.port, () => {
            (0, swagger_1.default)(app_1.default, default_1.default.port);
            logger_1.default.info(`Server live on: http://localhost:${default_1.default.port}`);
        })
            .on("error", (e) => {
            logger_1.default.error("Error occurred in the server:", e);
            // Exit the process with failure code
            process.exit(1);
        });
    }
    catch (error) {
        logger_1.default.error("Error connecting to the database:", error);
        // Exit the process with failure code
        process.exit(1);
    }
})();
