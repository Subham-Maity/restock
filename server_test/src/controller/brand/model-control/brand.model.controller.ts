import Brand from "../../../model/brand/brand.model";
import ErrorHandler from "../../../../error/errorHandler";
import { IBrand } from "../../../types/brand/brand";
// 💾  Function to save brand data
export const saveBrand = async (brandData: Record<string, any>) => {
  try {
    const brand = new Brand(brandData);
    return await brand.save();
  } catch (error: any) {
    throw new Error(`Error saving brand: ${error.message}`);
  }
};

// 💾 Function to fetch all brands

export const fetchAllBrands = async (): Promise<IBrand[]> => {
  try {
    const brands = await Brand.find({}).exec();
    if (!brands || brands.length === 0) {
      throw new ErrorHandler("No brands found", 404);
    }
    return brands;
  } catch (error: any) {
    throw new Error(`Error fetching brands: ${error.message}`);
  }
};
