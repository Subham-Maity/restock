import {Request, Response, NextFunction} from 'express';
import catchAsyncError from '../../middleware/catchAsyncError.js';
import ErrorHandler from '../../utils/errorHandler.js'
import Banner from '../../model/banner/banner.model.js';


//custom error class for product not found*/
class BannerNotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
    }
}
//Functions
export const fetchBanner = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let query = Banner.find();
        //We need it x-total-count for pagination in the frontend because we need to know the total number of products
        res.set('Total-banner', query.toString());

        const docs = await query.exec();
        //Addition check to see if the product array is empty
        if (docs.length === 0) {
            throw new BannerNotFoundError('No products found');
        }
        console.log('Data returned from MongoDB:', docs);
        //Sending the products as a response
        res.status(200).json(docs);

    } catch (error) {
        //Custom error handling
        if (error instanceof BannerNotFoundError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            next(error);
        }
    }
});


/*FETCHING A SINGLE PRODUCT*/

//custom error class for product not found*/
class BannerNotFoundError2 extends Error {
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

        const banner = await Banner.findById(id);

        if (!banner) {
            throw new BannerNotFoundError2('Product not found');
        }

        res.status(200).json(banner);
    } catch (error) {
        if (error instanceof BannerNotFoundError2) {
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

export const updateBanner = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the ID from the request parameters
        const {id} = req.params;

        // Check if the provided ID is valid
        if (!id || !isValidObjectId(id)) {
            return next(new ErrorHandler('Invalid product ID', 400));
        }

        const updatedBanner = await Banner.findByIdAndUpdate(id, req.body, {new: true});

        if (!updatedBanner) {
            return next(new ErrorHandler('Product not found', 404));
        }

        res.status(200).json(updatedBanner);
    } catch (error) {
        if (error.name === 'CastError') {
            return next(new ErrorHandler('Invalid product ID', 400));
        } else {
            next(new ErrorHandler('Internal server error', 500));
        }
    }
});

