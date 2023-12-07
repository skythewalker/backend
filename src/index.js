//require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import express from 'express'
import { connectDB } from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
})
connectDB()
.then(() => {
     app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running at port: ", process.env.PORT)
     });
})
.catch(err => console.log("MongoDB connection FAILED !!", err))
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on('Error', (error) => {
//         console.log('Error', error);
//         throw error;
//     });
//     app.listen(process.env.PORT, () => {
//         console.log('Application is running on port :' ,process.env.PORT);
//     })
    
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// })()