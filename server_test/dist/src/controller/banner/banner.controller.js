"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBanner = exports.fetchBanner = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../../error/errorHandler"));
const banner_model_1 = __importDefault(require("../../model/banner/banner.model")); //custom error class for product not found*/
//custom error class for product not found*/
class BannerNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
//Functions
exports.fetchBanner = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        let query = banner_model_1.default.find();
        //We need it x-total-count for pagination in the frontend because we need to know the total number of products
        res.set("Total-banner", query.toString());
        const docs = await query.exec();
        //Addition check to see if the product array is empty
        if (docs.length === 0) {
            throw new BannerNotFoundError("No products found");
        }
        console.log("Data returned from MongoDB:", docs);
        //Sending the products as a response
        res.status(200).json(docs);
    }
    catch (error) {
        //Custom error handling
        if (error instanceof BannerNotFoundError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
});
/* UPDATE PRODUCT */
// Helper function to check if ID is a valid ObjectId
function isValidObjectId(id) {
    // Use your preferred method to validate ObjectId (e.g., using mongoose.Types.ObjectId.isValid)
    // For example:
    // return mongoose.Types.ObjectId.isValid(id);
    return /^[0-9a-fA-F]{24}$/.test(id); // Simplified check (24-character hex string)
}
exports.updateBanner = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        // Get the ID from the request parameters
        const { id } = req.params;
        // Check if the provided ID is valid
        if (!id || !isValidObjectId(id)) {
            return next(new errorHandler_1.default("Invalid product ID", 400));
        }
        const updatedBanner = await banner_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedBanner) {
            return next(new errorHandler_1.default("Product not found", 404));
        }
        res.status(200).json(updatedBanner);
    }
    catch (error) {
        if (error.name === "CastError") {
            return next(new errorHandler_1.default("Invalid product ID", 400));
        }
        else {
            next(new errorHandler_1.default("Internal server error", 500));
        }
    }
});
