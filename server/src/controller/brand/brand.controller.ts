import {Request, Response, NextFunction} from 'express';
import Brand from "../../model/brand/brand.model.js";
import ErrorHandler from "../../utils/errorHandler";
import catchAsyncError from "../../middleware/catchAsyncError";

export const fetchBrand = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        try {

            //Fetch all brands from the database
            const brands = await Brand.find({}).exec();

            //Send an error message if no brands are found
            if (!brands || brands.length === 0) {
                throw new ErrorHandler('No brands found', 404);
            }

            res.status(200).json(brands);
        } catch (err) {
            //CastError is thrown when an invalid ID is passed to findById()
            if (err.name === 'CastError') {
                err = new ErrorHandler(`Invalid ID: ${err.value}`, 400);
            }

            next(err); // Pass the error to the global error handler
        }
    }
);