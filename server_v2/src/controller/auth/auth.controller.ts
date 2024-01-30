import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../error/catchAsyncError";
import { sanitizeUser } from "../../services/sanitize/sanitize.utils";
import {
  hashPassword,
  IHashedPassword,
} from "../../security/hash/crypto/hash.password.util";
import { createUser } from "./model-control/auth.model.controller";
import {
  COOKIE_NAME_SET,
  cookieOptions,
} from "../../storage/cookie/cookie.setting";
import { setCookie } from "../../storage/cookie/cookie";
import { JWT_EXPIRATION_TIME, JWT_SECRET_KEY } from "../../config/default";
import { signPayload } from "../../security/jwt/sign.utils";
import { IUser } from "../../types/user/user";
import {
  LoginSchema,
  RegisterSchema,
} from "../../validation/zod-validation/auth/auth.validation";

/*☑️  CREATE USER ️ ☑️*/
export const registerUser = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    RegisterSchema.parse(req.body);
    //Pass the password to the hashPassword function
    // Destructure the salt and hashedPassword from the returned object
    const { salt, hashedPassword }: IHashedPassword = await hashPassword(
      req.body.password,
    );
    //Create the user in the database with the hashed password and salt
    const user = await createUser({
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
    req.login(sanitizeUser(user), (err) => {
      // this also calls serializer and adds to session
      if (err) {
        res.status(400).json(err);
      } else {
        const token = signPayload(sanitizeUser(user), JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRATION_TIME,
        });
        setCookie(res, COOKIE_NAME_SET, token, cookieOptions);
        res.status(201).json({
          msg: "Login Successful...!",
          id: user.id,
          role: user.role,
        });
      }
    });
  },
);

/*☑️LOGIN USER ☑️*/
export const loginUser = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    //req from passport local strategy
    const user = req.user as IUser;

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Email or Password",
      });
    }
    //LoginSchema.parse(req.body);
    LoginSchema.parse(req.body);
    //token send by passport local strategy
    setCookie(res, COOKIE_NAME_SET, user.token, cookieOptions);
    res
      .status(201)
      .json({ msg: "Login Successful...!", id: user.id, role: user.role });
  },
);

/*☑️ CHECK USER ☑️*/
export const checkUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: "success", user: req.user });
  },
);
