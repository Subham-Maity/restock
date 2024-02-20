import mongoose, { Model, model, Schema } from "mongoose";
import { IOrder } from "../../types/order/order";

const paymentMethods = {
  values: ["card", "cash"],
  message: "enum validator failed for payment Methods",
};

const OrderSchema: Schema = new mongoose.Schema(
  {
    items: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    totalItems: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: paymentMethods,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    status: {
      type: String,
      default: "pending",
    },
    selectedAddress: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

//Create a virtual data field for id to replace the _id field in the output
//Purpose: The _id field is an internal field of MongoDB and is not suitable for external use.
//In our Frontend, we will use the id field instead of the _id field.
const virtualId = OrderSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

// Set the schema options to enable the virtual fields and remove unwanted properties when converting a document to JSON
OrderSchema.set("toJSON", {
  virtuals: true, // enable virtual fields

  versionKey: false, // remove __v property

  //Define a custom transform function to delete the _id property
  transform: function (_, ret) {
    delete ret._id;
  },
});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
