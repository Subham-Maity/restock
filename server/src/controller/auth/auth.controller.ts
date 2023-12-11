import { NextFunction, Request, Response } from 'express';
import User from '../../model/user/user.model.js';
import { IUser } from '../../types/user/user.js';
import catchAsyncError from '../../middleware/catchAsyncError.js';

/* CREATE USER */
export const createUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password,
            role,
            addresses,
            name,
            salt,
            resetPasswordToken,
        }: IUser = req.body;

        // Check if required fields are present
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const newUser = new User({
            email,
            password,
            role: role || 'user', // Set default role if not provided
            addresses,
            name,
            salt,
            resetPasswordToken,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});
