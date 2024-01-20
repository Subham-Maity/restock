`user.model.ts`
```typescript
import mongoose, { Schema, Model, model } from 'mongoose';
import { IUser } from "../../types/user/user.js";

const userSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:
        Buffer,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    addresses: {
        type: [Schema.Types.Mixed]
    },
    name: {
        type: String
    },
    salt: Buffer,
    resetPasswordToken: {
        type: String,
        default: '' },
}, {
    timestamps: true
});

const virtualId = userSchema.virtual('id');
virtualId.get(function (this: { _id: any }) {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;

```
`AuthController.ts`
```typescript
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



/* LOGIN USER */
export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: IUser = req.body;

        // Check if required fields are present
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password === password) {
            // Passwords match
            res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        } else {
            // Passwords don't match
            res.status(400).json({ message: 'Wrong credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});


```