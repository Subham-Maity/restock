"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const default_1 = __importDefault(require("./default"));
const logger_1 = __importDefault(require("../utils/logger/logger"));
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL || `mongodb://localhost:${default_1.default.port}/mydatabase`;
        //It is recommended to set useNewUrlParser, useUnifiedTopology, and useCreateIndex to true.
        mongoose_1.default.set("strictQuery", true);
        const con = await mongoose_1.default.connect(uri);
        logger_1.default.info(`MongoDB Connected: ` + `${con.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.info(`Error: ${error.message}`);
        }
        else {
            logger_1.default.info(`An unknown error occurred`);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
