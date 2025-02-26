import mongoose, { Schema } from "mongoose";

export const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AdminModel = mongoose.model("Admin", AdminSchema);
