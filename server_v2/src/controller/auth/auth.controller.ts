import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/error/catchAsyncError";

import { sanitizeUser } from "../../services/sanitize/sanitize.utils";
import { validationResult } from "express-validator";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import {
  hashPassword,
  IHashedPassword,
} from "../../security/hash/crypto/hash.password.util";
import { createUser } from "./auth.model.controller";
import { cookieOptions } from "../../storage/cookie/cookie.config";
import { setCookie } from "../../storage/cookie/cookie";
import {
  COOKIE_NAME,
  JWT_EXPIRATION_TIME,
  JWT_SECRET_KEY,
} from "../../config/default";
import { signPayload } from "../../security/jwt/sign.utils";
import { IUser } from "../../types/user/user";

/* CREATE USER */

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ErrorHandler(
          errors
            .array()
            .map((err) => err.msg)
            .join(", "),
          400,
        ),
      );
    }

    try {
      //Pass the password to the hashPassword function
      // Destructure the salt and hashedPassword from the returned object
      //@ts-ignore
      const { salt, hashedPassword }: IHashedPassword = await hashPassword(
        req.body.password,
      );
      //Create the user in the database with the hashed password and salt
      const user = await createUser({
        ...req.body,
        password: hashedPassword,
        salt,
      });
      //If the user is created successfully, sign the user and return the JWT token
      req.login(sanitizeUser(user), (err) => {
        // this also calls serializer and adds to session
        if (err) {
          res.status(400).json(err);
        } else {
          const token = signPayload(sanitizeUser(user), JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRATION_TIME,
          });
          setCookie(res, COOKIE_NAME, token, cookieOptions);
          res.status(201).json({
            msg: "Login Successful...!",
            id: user.id,
            role: user.role,
          });
        }
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
);
/* LOGIN USER */
export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //req from passport local strategy
    const user = req.user as IUser;

    try {
      //token send by passport local strategy
      setCookie(res, COOKIE_NAME, user.token, cookieOptions);
      console.log(user.id);
      res
        .status(201)
        .json({ msg: "Login Successful...!", id: user.id, role: user.role });
    } catch (err) {
      res.status(400).json(err);
    }
  },
);
/*CHECK USER*/
export const checkUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: "success", user: req.user });
  },
);
