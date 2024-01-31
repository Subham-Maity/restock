import mongoose, { model, Schema } from "mongoose";
import { ICart } from "../../types/cart/cart";

const CartSchema: Schema = new mongoose.Schema<ICart>({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//Create a virtual data field for id to replace the _id field in the output
//Purpose: The _id field is an internal field of MongoDB and is not suitable for external use.
//In our Frontend, we will use the id field instead of the _id field.
const virtualId = CartSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

// Set the schema options to enable the virtual fields and remove unwanted properties when converting a document to JSON
CartSchema.set("toJSON", {
  virtuals: true, // enable virtual fields

  versionKey: false, // remove __v property

  //Define a custom transform function to delete the _id property
  transform: function (_, ret) {
    delete ret._id;
  },
});

const Cart = model("Cart", CartSchema);

export default Cart;
