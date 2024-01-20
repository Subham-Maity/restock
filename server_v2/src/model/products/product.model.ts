import mongoose, { Model, model, Schema } from "mongoose";
import { IProduct } from "../../types/products/product";

const productSchema: Schema = new mongoose.Schema({
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
    type: [Schema.Types.Mixed], //Schema.Types.Mixed is used to store any type of data
  },
  sizes: {
    type: [Schema.Types.Mixed],
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

// Set the schema options to enable the virtual fields and remove unwanted properties when converting a document to JSON
productSchema.set("toJSON", {
  virtuals: true, // enable virtual fields

  versionKey: false, // remove __v property

  //Define a custom transform function to delete the _id property
  transform: function (doc, ret) {
    delete ret._id;
  },
});

productSchema.index({ title: 1, description: 1 }, { unique: true });
const Product: Model<IProduct> = model<IProduct>("Product", productSchema);

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
export default Product;
