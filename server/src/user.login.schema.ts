import mongoose, { Schema } from "mongoose";

const UserLoginSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

export const UserLogin = mongoose.model("UserLogin", UserLoginSchema);
