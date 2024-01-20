import {NextFunction, Request, Response} from 'express';
import User from '../../model/user/user.model.js';
import * as crypto from "crypto";
import catchAsyncError from '../../middleware/catchAsyncError.js';
import jwt from "jsonwebtoken";
import {sanitizeUser} from "../../utils/protected.js";
import {SECRET_KEY} from "../../config.js";


/* CREATE USER */

export const createUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    try {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                const user = new User({...req.body, password: hashedPassword, salt});
                const doc = await user.save();

                req.login(sanitizeUser(doc), (err) => {  // this also calls serializer and adds to session
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
                        res.status(201).json(token);
                    }
                });
            }
        );
    } catch (err) {
        res.status(400).json(err);
    }
});

/* LOGIN USER */
export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.json(req.user);
});

/*CHECK USER*/
export const checkUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.json({status: 'success', user: req.user});
});