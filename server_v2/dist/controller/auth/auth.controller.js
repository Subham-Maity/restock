"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.loginUser = exports.registerUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const sanitize_utils_1 = require("../../services/sanitize/sanitize.utils");
const express_validator_1 = require("express-validator");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
const hash_password_util_1 = require("../../security/hash/crypto/hash.password.util");
const auth_model_controller_1 = require("./auth.model.controller");
const cookie_setting_1 = require("../../storage/cookie/cookie.setting");
const cookie_1 = require("../../storage/cookie/cookie");
const default_1 = require("../../config/default");
const sign_utils_1 = require("../../security/jwt/sign.utils");
/* CREATE USER */
exports.registerUser = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors
            .array()
            .map((err) => err.msg)
            .join(", "), 400));
    }
    try {
        //Pass the password to the hashPassword function
        // Destructure the salt and hashedPassword from the returned object
        const { salt, hashedPassword } = await (0, hash_password_util_1.hashPassword)(req.body.password);
        //Create the user in the database with the hashed password and salt
        const user = await (0, auth_model_controller_1.createUser)({
            ...req.body,
            password: hashedPassword,
            salt,
        });
        //If the user is created successfully, sign the user and return the JWT token
        req.login((0, sanitize_utils_1.sanitizeUser)(user), (err) => {
            // this also calls serializer and adds to session
            if (err) {
                res.status(400).json(err);
            }
            else {
                const token = (0, sign_utils_1.signPayload)((0, sanitize_utils_1.sanitizeUser)(user), default_1.JWT_SECRET_KEY, {
                    expiresIn: default_1.JWT_EXPIRATION_TIME,
                });
                (0, cookie_1.setCookie)(res, cookie_setting_1.COOKIE_NAME_SET, token, cookie_setting_1.cookieOptions);
                res.status(201).json({
                    msg: "Login Successful...!",
                    id: user.id,
                    role: user.role,
                });
            }
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
/* LOGIN USER */
exports.loginUser = (0, catchAsyncError_1.default)(async (req, res, next) => {
    //req from passport local strategy
    const user = req.user;
    try {
        //token send by passport local strategy
        (0, cookie_1.setCookie)(res, cookie_setting_1.COOKIE_NAME_SET, user.token, cookie_setting_1.cookieOptions);
        res
            .status(201)
            .json({ msg: "Login Successful...!", id: user.id, role: user.role });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
/*CHECK USER*/
exports.checkUser = (0, catchAsyncError_1.default)(async (req, res, next) => {
    res.json({ status: "success", user: req.user });
});
