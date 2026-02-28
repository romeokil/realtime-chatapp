import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app=express();
app.get('/',(req,res)=>{
    res.status(201).json({
        message:'Welcome to the Guest Request.'
    })
})

app.listen(PORT,()=>{
    try{
        connectDB();
        console.log(`Server is running at http://localhost:${PORT}`)
    }
    catch(error){
        console.log('error while connecting to server');
    }
})