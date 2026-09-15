import mongoose from "mongoose";

let connectionPromise;

const connectToDatabase = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not configured");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI).catch((error) => {
            connectionPromise = undefined;
            throw error;
        });
    }

    try {
        await connectionPromise;
        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

export default connectToDatabase;