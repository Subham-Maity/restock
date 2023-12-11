import {NextFunction, Request, Response} from 'express';
import User from '../../model/user/user.model.js';
import catchAsyncError from "../../middleware/catchAsyncError.js";

/* Fetch User By Id */
export const fetchUserById = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
       // Get the ID from the request parameters
        const {id} = req.params;
        try {
            // Check if the ID is a valid ObjectId
            const user = await User.findById(id);

            // If the ID is not a valid ObjectId, send 404 Not Found response
            if (user) {
                res.status(200).json({
                    id: user.id,
                    addresses: user.addresses,
                    email: user.email,
                    role: user.role,
                });
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch (err) {
            res.status(400).json(err);
        }

    }
);

/* UPDATE USER */

export const updateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    // Get the ID from the request parameters
        const {id} = req.params;
        try {
            // Check if the ID is a valid ObjectId
            const user = await User.findByIdAndUpdate(id, req.body, {new: true});

            // If the ID is not a valid ObjectId, send 404 Not Found response
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

