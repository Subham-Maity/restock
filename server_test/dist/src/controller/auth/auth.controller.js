"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.loginUser = exports.registerUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const sanitize_utils_1 = require("../../../protect/sanitize/sanitize.utils");
const hash_password_util_1 = require("../../../auth/hash/crypto/hash.password.util");
const auth_model_controller_1 = require("./model-control/auth.model.controller");
const cookie_setting_1 = require("../../../storage/cookie/cookie.setting");
const cookie_1 = require("../../../storage/cookie/cookie");
const sign_utils_1 = require("../../../auth/jwt/sign.utils");
const auth_validation_1 = require("../../validation/zod-validation/auth/auth.validation");
const jwt_setting_1 = require("../../../auth/jwt/jwt-setting");
/*☑️  CREATE USER ️ ☑️*/
exports.registerUser = (0, catchAsyncError_1.default)(async (req, res, _) => {
    auth_validation_1.RegisterSchema.parse(req.body);
    //Pass the password to the hashPassword function
    // Destructure the salt and hashedPassword from the returned object
    const { salt, hashedPassword } = await (0, hash_password_util_1.hashPassword)(req.body.password);
    //Create the user in the database with the hashed password and salt
    const user = await (0, auth_model_controller_1.createUser)({
        ...req.body,
        password: hashedPassword,
        salt,
    });
    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to create user",
        });
    }
    //If the user is created successfully, sign the user and return the JWT token
    req.login((0, sanitize_utils_1.sanitizeUser)(user), (err) => {
        // this also calls serializer and adds to session
        if (err) {
            res.status(400).json(err);
        }
        else {
            const token = (0, sign_utils_1.signPayload)((0, sanitize_utils_1.sanitizeUser)(user), jwt_setting_1.JWT_SECRET_KEY, {
                expiresIn: jwt_setting_1.JWT_EXPIRATION_TIME,
            });
            (0, cookie_1.setCookie)(res, cookie_setting_1.COOKIE_NAME_SET, token, cookie_setting_1.cookieOptions);
            res.status(201).json({
                msg: "Login Successful...!",
                id: user.id,
                role: user.role,
            });
        }
    });
});
/*☑️LOGIN USER ☑️*/
exports.loginUser = (0, catchAsyncError_1.default)(async (req, res, _) => {
    //req from passport local strategy
    const user = req.user;
    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Email or Password",
        });
    }
    //LoginSchema.parse(req.body);
    auth_validation_1.LoginSchema.parse(req.body);
    //token send by passport local strategy
    (0, cookie_1.setCookie)(res, cookie_setting_1.COOKIE_NAME_SET, user.token, cookie_setting_1.cookieOptions);
    res
        .status(201)
        .json({ msg: "Login Successful...!", id: user.id, role: user.role });
});
/*☑️ CHECK USER ☑️*/
exports.checkUser = (0, catchAsyncError_1.default)(async (req, res, _) => {
    if (req.user) {
        res.json(req.user);
    }
    else {
        res.sendStatus(401);
    }
});
