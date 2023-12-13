import {NextFunction, Request, Response} from 'express';
import User from '../../model/user/user.model.js';
import {IUser} from '../../types/user/user.js';
import catchAsyncError from '../../middleware/catchAsyncError.js';

/* CREATE USER */

export const createUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    try {
        const doc = await user.save();
        res.status(201).json({id: doc.id, role: doc.role});
    } catch (err) {
        res.status(400).json(err);
    }
});

/* LOGIN USER */
export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne(
            {email: req.body.email},
        ).exec();
        // TODO: this is just temporary, we will use strong password auth
        console.log({user})
        if (!user) {
            res.status(401).json({message: 'no such user email'});
        } else if (user.password === req.body.password) {
            // TODO: We will make addresses independent of login
            res.status(200).json({id: user.id, role: user.role});
        } else {
            res.status(401).json({message: 'invalid credentials'});
        }
    } catch (err) {
        res.status(400).json(err);
    }
});