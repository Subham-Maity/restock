import Category from "../../../model/category/category.model";
import { ICategory } from "../../../types/category/category";
import ErrorHandler from "../../../../error/errorHandler";
// 💾  Function to save category data
export const saveCategory = async (categoryData: Record<string, any>) => {
  try {
    const category = new Category(categoryData);
    return await category.save();
  } catch (error: any) {
    throw new Error(`Error saving category: ${error.message}`);
  }
};

// 💾 Function to fetch all categories
export const fetchAllCategories = async (): Promise<ICategory[]> => {
  try {
    const categories = await Category.find({}).exec();
    if (!categories || categories.length === 0) {
      throw new ErrorHandler("No categories found", 404);
    }
    return categories;
  } catch (error: any) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};
