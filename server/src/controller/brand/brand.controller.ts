import {Request, Response, NextFunction} from 'express';
import Brand from "../../model/brand/brand.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";

/*CREATE PRODUCT*/
export const createBrand = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // req.body does indeed typically refer to the data that's sent from the frontend as part of an HTTP POST or PUT request
        const {
            label,
            value
        } = req.body;

        // Check if all required fields are filled
        if (!label || !value) {
            return next(new ErrorHandler("Please fill all required fields", 400));
        }

        const newBrand = new Brand({
            label,
            value
        });

        //save() means that we're saving the newProduct object to the database
        await newBrand.save();

        res.status(201).json({message: "Brand created successfully"});

    } catch (error) {

        console.error("Error creating brand:", error);

        // Handle different types of errors with custom messages and status codes

        if (error instanceof ErrorHandler) {

            // If it's a known validation or custom error
            res.status(error.statusCode).json({message: error.message});

        } else {

            // For other unexpected errors
            next(new ErrorHandler('Internal server error', 500));
        }
    }
});


/*GET ALL PRODUCTS*/
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




