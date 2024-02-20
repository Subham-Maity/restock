"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationRules = void 0;
const zod_1 = require("zod");
exports.productValidationRules = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    brand: zod_1.z.string().min(1, "Brand is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    thumbnail: zod_1.z.string().min(1, "Thumbnail is required"),
    images: zod_1.z.array(zod_1.z.string()).min(1, "Images must be an array"),
});
