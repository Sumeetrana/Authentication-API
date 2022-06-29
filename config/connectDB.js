import mongoose from 'mongoose';

export const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTION = {
            dbName: 'authentication'
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION)
        console.log("Database connected successfully...");
    } catch (error) {
        console.log(error);
    }
}