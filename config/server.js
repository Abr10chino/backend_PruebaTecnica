"use strict";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import {dbConnection} from "./mongo.js";

import apiLimiter from "../src/middlewares/validate-PetitionLimit.js";

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.connectDB();
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

}

export default Server;