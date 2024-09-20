import mongoose from 'mongoose';

const connectDB = async (url: string): Promise<void> => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        throw new Error("Failed to connect to the database.");
    }
};

export default connectDB;

