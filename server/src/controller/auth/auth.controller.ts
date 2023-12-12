import { NextFunction, Request, Response } from 'express';
import User from '../../model/user/user.model.js';
import { IUser } from '../../types/user/user.js';
import catchAsyncError from '../../middleware/catchAsyncError.js';

/* CREATE USER */

export const createUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name, role, addresses, orders }: IUser = req.body;

        // Check if required fields are present
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            email,
            password,
            name,
            role,
            addresses,
            orders
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

/* LOGIN USER */
export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findOne(
                { email: req.body.email },
            ).exec();
            // TODO: this is just temporary, we will use strong password auth
            console.log({user})
            if (!user) {
                res.status(401).json({ message: 'no such user email' });
            } else if (user.password === req.body.password) {
                // TODO: We will make addresses independent of login
                res.status(200).json({id:user.id, email:user.email, name:user.name,addresses:user.addresses,role:user.role});
            } else {
                res.status(401).json({ message: 'invalid credentials' });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
);
