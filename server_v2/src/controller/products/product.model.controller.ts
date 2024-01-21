import Product from "../../model/products/product.model";
import { IProduct } from "../../types/products/product";

// 💾 Function to check if product already exists(Product Creation)
export const checkProductExists = async (title: string) => {
  try {
    const product = await Product.findOne({ title });
    if (product) {
      throw new Error("Product with the same title already exists");
    }
  } catch (error: any) {
    throw new Error(`Error checking product: ${error.message}`);
  }
};

// 💾 Function to save product data(Product Creation)
export const saveProduct = async (productData: Record<string, any>) => {
  try {
    await checkProductExists(productData.title);
    const product = new Product(productData);
    return await product.save();
  } catch (error: any) {
    throw new Error(`Error saving product: ${error.message}`);
  }
};

// 💾 Function to find a product by ID
export const findProductById = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findById(id);
  } catch (error: any) {
    throw new Error(`Error finding product: ${error.message}`);
  }
};

// 💾 Function to update a product
export const updateProductById = async (
  id: string,
  updateData: Record<string, any>,
): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error: any) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};
