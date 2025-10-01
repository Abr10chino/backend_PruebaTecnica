/*
    Archivo de configuración del servidor,
    donde se inicializan los middlewares,
    se conecta a la base de datos y se
    definen las rutas principales.
*/

"use strict";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import {dbConnection} from "./mongo.js";

import apiLimiter from "../src/middlewares/validate-PetitionLimit.js";

import productRoutes from "../src/products/product.routes.js";

class Server{

    // Constructor de la clase Server
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.productPath = "/BoldProductManager/v1/products";
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    // Configuración de middlewares (Seguridad)
    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(apiLimiter);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(helmet());
    }

    // Método para iniciar el servidor en un puerto específico
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    // Método para conectar a la base de datos
    async connectDB(){
        await dbConnection();
    }

    // Definición de las rutas principales
    routes(){
        this.app.use(this.productPath, productRoutes);
    }

}

export default Server;