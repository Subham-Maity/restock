import {Request, Response, NextFunction} from 'express';
import Product from '../model/products/product.model.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';


export const createProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // req.body does indeed typically refer to the data that's sent from the frontend as part of an HTTP POST or PUT request
        const {
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
            colors,
            sizes,
            highlights,
            discountPrice,
        } = req.body;

        // Check if all required fields are filled
        if (!title || !description || !brand || !category || !thumbnail || !images) {
            return next(new ErrorHandler("Please fill all required fields", 400));
        }

        const newProduct = new Product({
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
            colors,
            sizes,
            highlights,
            discountPrice,
        });

        //save() means that we're saving the newProduct object to the database
        await newProduct.save();

        res.status(201).json({message: "Product created successfully"});

    } catch (error) {

        console.error("Error creating product:", error);

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