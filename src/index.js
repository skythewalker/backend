//require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import express from 'express'
import { connectDB } from './db/index.js';

dotenv.config({
    path: './env'
})
connectDB();
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