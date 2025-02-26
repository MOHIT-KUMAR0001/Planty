import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
});
export const Products = mongoose.model("Product", productSchema);