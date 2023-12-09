import {Request, Response, NextFunction} from 'express';
import Category from "../../model/category/category.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";

export const fetchCategory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        try {

            //Fetch all categories from the database
            const categories = await Category.find({}).exec();

            //Send an error message if no categories are found
            if (!categories || categories.length === 0) {
                throw new ErrorHandler('No categories found', 404);
            }

            res.status(200).json(categories);
        } catch (err) {
            //CastError is thrown when an invalid ID is passed to findById()
            if (err.name === 'CastError') {
                err = new ErrorHandler(`Invalid ID: ${err.value}`, 400);
            }

            next(err); // Pass the error to the global error handler
        }
    }
);