"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cors_setting_1 = require("./cors.setting");
function configureCors(app) {
    const corsSettings = {
        origin: cors_setting_1.cors_origin,
        optionsSuccessStatus: cors_setting_1.optionsSuccessStatus,
        exposedHeaders: cors_setting_1.exposedHeaders,
        credentials: cors_setting_1.credentials,
    };
    app.use((0, cors_1.default)(corsSettings));
}
exports.default = configureCors;
