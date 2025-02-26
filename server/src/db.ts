import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection:string = process.env.DATABASE_URL || "mongodb://localhost:2727/";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connection);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
export default connectDB;