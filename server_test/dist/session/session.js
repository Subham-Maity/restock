"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSession = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const default_1 = __importDefault(require("../config/default"));
const passport_setting_1 = require("../auth/passport/passport.setting");
const configureSession = (app) => {
    app.use((0, express_session_1.default)({
        store: connect_mongo_1.default.create({
            mongoUrl: default_1.default.db,
        }),
        secret: passport_setting_1.Passport_Session_Secret,
        resave: false, // don't save session if unmodified
        saveUninitialized: false, //don't create session until something stored
    }));
};
exports.configureSession = configureSession;
