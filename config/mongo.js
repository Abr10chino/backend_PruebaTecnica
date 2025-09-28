'use strict';

import mongoose from "mongoose";

export const dbConnection = async() => {
    try{
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Not Found Connection to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () =>{
            console.log('MongoDB | Finding Connection');
        });
        mongoose.connection.on('open', () =>{
            console.log('MongoDB | Connected to MongoDB');
        });
        mongoose.connection.on('reconnected', () =>{
            console.log('MongoDB | Reconnected to MongoDB');
        });
        mongoose.connection.on('disconnected', () =>{
            console.log('MongoDB | Disconnected from MongoDB');
        });
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        }) 
    }catch(error){
        console.log('MongoDB | Databse Error; connection failed', error);
    }
}