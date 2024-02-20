import mongoose, { model, Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Buffer,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  addresses: {
    type: [Schema.Types.Mixed],
  },
  name: {
    type: String,
  },
  orders: {
    type: [Schema.Types.Mixed],
  },
  salt: {
    type: Buffer,
  },
});

const virtualId = userSchema.virtual("id");
virtualId.get(function (this: { _id: any }) {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

const User = model("User", userSchema);

export default User;
