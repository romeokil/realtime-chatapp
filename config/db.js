import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected Successfully!!')
    }
    catch(error){
        console.log('Error while connecting to database');
    }
}