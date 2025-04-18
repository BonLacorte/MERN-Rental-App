import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "../constants/env";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB