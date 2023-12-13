import {Request, Response, NextFunction} from 'express';
import Product from '../../model/products/product.model.js';
import catchAsyncError from '../../middleware/catchAsyncError.js';
import ErrorHandler from '../../utils/errorHandler.js'


/*CREATE PRODUCT*/
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


/*PRODUCT FETCHING & FILTERING & SORTING & PAGINATION*/
//Testing URL: http://localhost:5050/products?category=fragrances&_sort=price&_order=asc&_page=1&_limit=2


//custom error class for product not found*/
class ProductNotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
    }
}


//Functions
export const fetchProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let condition:any = {}
        if(!req.query.admin){
            condition.deleted = {$ne:true}
        }

        // Initialize the query without executing it
        //Purpose: Deleted false products won't show up on the frontend
        let query = Product.find(condition);

        //same deleted false purpose for pagination
        let totalProductsQuery = Product.find(condition);


        //Filtering the products based on the query parameters
        //Sort Example = {_sort: 'price', _order: 'asc'} or {_sort: 'price', _order: 'desc'}
        //Filter Example  = {"category": ["smartphone", "laptop"]} or {"brand": ["apple", "samsung"]}
        //Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}

        //Todo:✅ Multiple Cemeteries and Brands
        //Filtering the products based on the category
        if (req.query.category) {
            query = query.where({category: req.query.category});
            //It will be used for pagination
            totalProductsQuery = totalProductsQuery.where({category: req.query.category});
        }

        //Filtering the products based on the brand
        if (req.query.brand) {
            query = query.where({brand: req.query.brand});
            totalProductsQuery = totalProductsQuery.where({brand: req.query.brand});
        }


        //Sorting the products based on the price
        if (req.query._sort && req.query._order) {
            const sortKey = req.query._sort as string;
            const sortOrder = req.query._order as string;
            const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};
            sortCriteria[sortKey] = sortOrder as 'asc' | 'desc';
            query = query.sort(sortCriteria);
        }

        //It will be used for pagination
        const totalDocs = await totalProductsQuery.count().exec();

        //Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}
        //Math = pageSize = 5, page = 3  =>  skip((3-1)*5).limit(5) => skip(10).limit(5)
        if (req.query._page && req.query._limit) {
            const pageSize = parseInt(req.query._limit as string);
            const page = parseInt(req.query._page as string);
            query = query.skip((page - 1) * pageSize).limit(pageSize);
        }

        // Executing the query
        const docs = await query.exec();

        //We need it x-total-count for pagination in the frontend because we need to know the total number of products
        res.set('X-Total-Count', totalDocs.toString());

        //Addition check to see if the product array is empty
        if (docs.length === 0) {
            throw new ProductNotFoundError('No products found');
        }

        //Sending the products as a response
        res.status(200).json(docs);

    } catch (error) {
        //Custom error handling
        if (error instanceof ProductNotFoundError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            next(error);
        }
    }
});


/*FETCHING A SINGLE PRODUCT*/

//custom error class for product not found*/
class ProductNotFoundError2 extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
    }
}

//Fetching a single product
export const fetchProductById = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id);

        if (!product) {
            throw new ProductNotFoundError2('Product not found');
        }

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof ProductNotFoundError2) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            next(error);
        }
    }
});


/* UPDATE PRODUCT */

// Helper function to check if ID is a valid ObjectId
function isValidObjectId(id: string): boolean {
    // Use your preferred method to validate ObjectId (e.g., using mongoose.Types.ObjectId.isValid)
    // For example:
    // return mongoose.Types.ObjectId.isValid(id);
    return /^[0-9a-fA-F]{24}$/.test(id); // Simplified check (24-character hex string)
}

export const updateProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the ID from the request parameters
        const {id} = req.params;

        // Check if the provided ID is valid
        if (!id || !isValidObjectId(id)) {
            return next(new ErrorHandler('Invalid product ID', 400));
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});

        if (!updatedProduct) {
            return next(new ErrorHandler('Product not found', 404));
        }

        // Calculate discountPrice if necessary
        if ('price' in req.body || 'discountPercentage' in req.body) {
            updatedProduct.discountPrice = Math.round(updatedProduct.price * (1 - (updatedProduct.discountPercentage || 0) / 100));
            await updatedProduct.save();
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.name === 'CastError') {
            return next(new ErrorHandler('Invalid product ID', 400));
        } else {
            next(new ErrorHandler('Internal server error', 500));
        }
    }
});

