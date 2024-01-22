import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/error/catchAsyncError";

import { sanitizeUser } from "../../services/sanitize/sanitize.utils";
import { validationResult } from "express-validator";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import {
  hashPassword,
  IHashedPassword,
} from "../../utils/security/hash.password.util";
import { createUser } from "./auth.model.controller";
import { signPayload } from "../../utils/jwt/sign.utils";
import { JWT_SECRET_KEY } from "../../config/default";

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
        if (err) {
          res.status(400).json(err);
        } else {
          const token = signPayload(sanitizeUser(user), JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(201).json(token);
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
    res.json(req.user);
  },
);

/*CHECK USER*/
export const checkUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: "success", user: req.user });
  },
);
