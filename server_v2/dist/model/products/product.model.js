"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: [1, "wrong min price"],
        max: [1000000, "wrong max price"],
    },
    discountPercentage: {
        type: Number,
        min: [1, "wrong min discount"],
        max: [99, "wrong max discount"],
    },
    rating: {
        type: Number,
        min: [0, "wrong min rating"],
        max: [5, "wrong max price"],
        default: 0,
    },
    stock: {
        type: Number,
        min: [0, "wrong min stock"],
        default: 0,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    colors: {
        type: [mongoose_1.Schema.Types.Mixed], //Schema.Types.Mixed is used to store any type of data
    },
    sizes: {
        type: [mongoose_1.Schema.Types.Mixed],
    },
    discountPrice: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
//Create a virtual data field for id to replace the _id field in the output
//Purpose: The _id field is an internal field of MongoDB and is not suitable for external use.
//In our Frontend, we will use the id field instead of the _id field.
const virtualId = productSchema.virtual("id");
virtualId.get(function () {
    return this._id;
});
//use the index method to define indexes for the collection to improve the performance of queries
//The text index allows you to search for a string in multiple fields
productSchema.index({
    title: "text",
    description: "text",
    brand: "text",
    category: "text",
});
// Set the schema options to enable the virtual fields and remove unwanted properties when converting a document to JSON
productSchema.set("toJSON", {
    virtuals: true, // enable virtual fields
    versionKey: false, // remove __v property
    //Define a custom transform function to delete the _id property
    transform: function (doc, ret) {
        delete ret._id;
    },
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
