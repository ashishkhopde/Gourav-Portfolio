import mongoose from "mongoose";
import "dotenv/config";

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected...");
    }catch(err){
        console.log("DB connection error : ", err);
    }
}