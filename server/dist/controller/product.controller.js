import Product from '../model/products/product.model.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
//Create new product
export const createProduct = catchAsyncError(async (req, res, next) => {
    try {
        // req.body does indeed typically refer to the data that's sent from the frontend as part of an HTTP POST or PUT request
        const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, colors, sizes, highlights, discountPrice, } = req.body;
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
        res.status(201).json({ message: "Product created successfully" });
    }
    catch (error) {
        console.error("Error creating product:", error);
        // Handle different types of errors with custom messages and status codes
        if (error instanceof ErrorHandler) {
            // If it's a known validation or custom error
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            // For other unexpected errors
            next(new ErrorHandler('Internal server error', 500));
        }
    }
});
//Fetch all products
export const fetchProduct = catchAsyncError(async (req, res, next) => {
    try {
        // req.params.id typically refers to the id that's sent from the frontend as part of an HTTP GET request
        const id = req.params.id;
        // Check if id is provided
        if (!id) {
            return next(new ErrorHandler("Please provide an id", 400));
        }
        // findById() means that we're fetching the product object from the database using its id
        const product = await Product.findById(id);
        // Check if the product exists
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).json({ message: "Product fetched successfully", product });
    }
    catch (error) {
        console.error("Error fetching product:", error);
        // Handle different types of errors with custom messages and status codes
        if (error instanceof ErrorHandler) {
            // If it's a known validation or custom error
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            // For other unexpected errors
            next(new ErrorHandler('Internal server error', 500));
        }
    }
});
//# sourceMappingURL=product.controller.js.map