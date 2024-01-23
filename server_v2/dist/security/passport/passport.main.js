"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// passport.ts
const passport_jwt_1 = require("passport-jwt");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const default_1 = require("../../config/default");
const verify_password_utils_1 = require("../hash/crypto/verify.password.utils");
const option_utils_1 = require("../../services/extractor/jwt/option.utils");
const sanitize_utils_1 = require("../../services/sanitize/sanitize.utils");
const user_model_controller_1 = require("../../controller/user/user.model.controller");
const sign_utils_1 = require("../jwt/sign.utils");
const passportSetup = (app) => {
    //Passport for authentication and session management
    app.use((0, express_session_1.default)({
        secret: default_1.Passport_Session_Secret,
        resave: false, // don't save session if unmodified
        saveUninitialized: false, //don't create session until something stored
    }));
    //Initialize passport and session
    app.use(passport_1.default.authenticate("session"));
    //Passport for authentication and session management - Local Strategy
    const LocalStrategy = passport_local_1.default.Strategy;
    //Passport for authentication and session management - JWT Strategy
    //Passport for authentication and session management - JWT Strategy
    passport_1.default.use("local", // name of the strategy (used to authenticate requests)
    //we change the default usernameField from "username" to "email"
    new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
        try {
            //Find the user associated with the email provided by the user
            const user = await (0, user_model_controller_1.findUserByEmail)(email);
            //If the user isn't found in the database, return a message
            if (!user) {
                return done(null, false, { message: "invalid credentials" });
            }
            //Verify the password and if it doesn't match, return a message
            const isPasswordValid = await (0, verify_password_utils_1.verifyPassword)(password, user);
            //If the password doesn't match, return a message
            if (!isPasswordValid) {
                return done(null, false, { message: "invalid credentials" });
            }
            // If credentials are correct, pass a user object to signPayload function
            // to create a JWT token for the user and return the JWT token
            const token = (0, sign_utils_1.signPayload)((0, sanitize_utils_1.sanitizeUser)(user), default_1.JWT_SECRET_KEY, {
                expiresIn: default_1.JWT_EXPIRATION_TIME,
            });
            done(null, { token });
        }
        catch (err) {
            done(err);
        }
    }));
    //Passport for authentication and session management - JWT Strategy
    passport_1.default.use("jwt", new passport_jwt_1.Strategy(option_utils_1.opts, async function (jwt_payload, done) {
        try {
            const user = await (0, user_model_controller_1.findUserById_Token)(jwt_payload.sub);
            if (user) {
                return done(null, (0, sanitize_utils_1.sanitizeUser)(user));
            }
            else {
                return done(null, false);
            }
        }
        catch (err) {
            return done(err, false);
        }
    }));
    //This creates a session variable for the user (req.user) when the first time user logs in
    passport_1.default.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, { id: user.id, role: user.role });
        });
    });
    //This is used to retrieve the user object based on the session variable (req.user)
    //and attach it to the request object as req.user
    passport_1.default.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
};
exports.default = passportSetup;
