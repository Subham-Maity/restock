import mongoose, { Schema, Model, model } from 'mongoose';
import { IUser } from "../../types/user/user.js";

const userSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    addresses: {
        type: [Schema.Types.Mixed]
    },
    name: {
        type: String
    },
    orders: {
        type: [Schema.Types.Mixed]
    }

});


const virtualId = userSchema.virtual('id');
virtualId.get(function (this: { _id: any }) {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
