/*
    Archivo de configuración de la base de datos MongoDB,
    se conecta a la base de datos utilizando Mongoose.
*/

'use strict';

import mongoose from "mongoose";

export const dbConnection = async() => {
    try{
        // La Base No se conecto
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Not Found Connection to MongoDB');
            mongoose.disconnect();
        });
        // La Base de datos se esta conectando
        mongoose.connection.on('connecting', () =>{
            console.log('MongoDB | Finding Connection');
        });
        // La Base de datos se conecto
        mongoose.connection.on('open', () =>{
            console.log('MongoDB | Connected to MongoDB');
        });
        // La Base de datos se volvio a conectar
        mongoose.connection.on('reconnected', () =>{
            console.log('MongoDB | Reconnected to MongoDB');
        });
        // La Base de datos se desconecto
        mongoose.connection.on('disconnected', () =>{
            console.log('MongoDB | Disconnected from MongoDB');
        });
        // Conexion a la base de datos
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        }) 
    }catch(error){
        console.log('MongoDB | Databse Error; connection failed', error);
    }
}