"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMorgan = void 0;
const morgan_1 = __importDefault(require("morgan"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const uuid_1 = require("uuid");
const morgan_setting_1 = require("./morgan.setting");
let counter = 0;
const setupMorgan = (app) => {
    morgan_1.default.token("id", function getId(req) {
        return req.id;
    });
    morgan_1.default.token("date", function (_, _res, tz) {
        return (0, moment_timezone_1.default)()
            .tz(tz)
            .format("YYYY-MM-DD HH:mm:ss.SSS");
    });
    morgan_1.default.token("origin", function getOrigin(req) {
        return req.requestOrigin;
    });
    app.use((req, _, next) => {
        counter++; // Increment the counter
        req.id = `${counter}-${(0, uuid_1.v4)()}`; // Prepend the counter to the unique ID
        req.requestOrigin = req.headers.origin || req.headers.referer; // Retrieves the request origin from headers
        next(); // Passes control to the next middleware
    });
    app.use((0, morgan_1.default)(morgan_setting_1.format_morgan));
};
exports.setupMorgan = setupMorgan;
