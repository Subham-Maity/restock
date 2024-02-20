import mongoose, { Model, model, Schema } from "mongoose";
import { ICategory } from "../../types/category/category";

const CategorySchema: Schema = new mongoose.Schema<ICategory>({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

//Create a virtual data field for id to replace the _id field in the output
//Purpose: The _id field is an internal field of MongoDB and is not suitable for external use.
//In our Frontend, we will use the id field instead of the _id field.
const virtualId = CategorySchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

// Set the schema options to enable the virtual fields and remove unwanted properties when converting a document to JSON
CategorySchema.set("toJSON", {
  virtuals: true, // enable virtual fields

  versionKey: false, // remove __v property

  //Define a custom transform function to delete the _id property
  transform: function (_, ret) {
    delete ret._id;
  },
});

const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);

export default Category;
