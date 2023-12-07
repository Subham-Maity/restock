import {Request, Response, NextFunction} from 'express';
import Product from '../model/products/product.model.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';


//Create new product
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


//Fetch all products
export const fetchProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        //Querying the database for all products
        let query = Product.find({});

        //Filtering the products based on the query parameters

        //Sort Example = {_sort: 'price', _order: 'asc'} or {_sort: 'price', _order: 'desc'}
        //Filter Example  = {"category": ["smartphone", "laptop"]} or {"brand": ["apple", "samsung"]}
        //Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}


        //Filtering the products based on the category
        if (req.query.category) {
            await query.find({category: req.query.category});
        }
        //Filtering the products based on the brand
        if (req.query.brand) {
            await query.find({brand: req.query.brand});
        }

        //Sorting the products based on the price
        if (req.query._sort && req.query._order) {

            //For Javascript
            // await query.sort({[req.query._sort]: req.query._order});

            //For Typescript(same as Javascript)
            const sortKey = req.query._sort as string;
            const sortOrder = req.query._order as string;
            const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};
            sortCriteria[sortKey] = sortOrder as 'asc' | 'desc';
            await query.sort(sortCriteria);
        }

        //Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}
        //Math = pageSize = 5, page = 3  =>  skip((3-1)*5).limit(5) => skip(10).limit(5)
        if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit as string;
            const page = req.query._page as string;
            query = query.skip((parseInt(page) - 1) * parseInt(pageSize)).limit(parseInt(pageSize));
        }


        try {
            //Executing the query
            const docs = await query.exec();

            //Sending the products as a response
            res.status(200).json(docs);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
);