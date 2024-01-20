import mongoose, {Schema, Model, model} from 'mongoose';
import {IBanner} from "../../types/banner/banner.js";

const bannerSchema: Schema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
});

//Create a virtual data field for id to replace the _id field in the output
//Purpose: The _id field is an internal field of MongoDB and is not suitable for external use.
//In our Frontend, we will use the id field instead of the _id field.
const virtualId = bannerSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

// Set the schema options to enable the virtual fields and remove unwanted properties when converting a document to JSON
bannerSchema.set('toJSON', {

    virtuals: true,// enable virtual fields
    versionKey: false,// remove __v property

    //Define a custom transform function to delete the _id property
    transform: function (doc, ret) {
        delete ret._id
    }
})

const Banner: Model<IBanner> = model<IBanner>("Banner", bannerSchema);

export default Banner;
