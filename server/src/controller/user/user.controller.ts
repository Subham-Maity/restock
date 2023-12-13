import {NextFunction, Request, Response} from 'express';
import User from '../../model/user/user.model.js';
import catchAsyncError from "../../middleware/catchAsyncError.js";

/* Fetch User By Id */
export const fetchUserById = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

/* UPDATE USER */

export const updateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});
