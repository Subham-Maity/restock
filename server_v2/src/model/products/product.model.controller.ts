import Product from "./product.model";

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
