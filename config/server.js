"use strict";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import {dbConnection} from "./mongo.js";

import apiLimiter from "../src/middlewares/validate-PetitionLimit.js";

import productRoutes from "../src/products/product.routes.js";

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.productPath = "/BoldProductManager/v1/products";
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(apiLimiter);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(helmet());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    async connectDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.productPath, productRoutes);
    }

}

export default Server;