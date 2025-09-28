import { Router } from "express";
import { check } from "express-validator";

import { createProduct, getProducts } from "./product.controller.js";

import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.post("/addProduct",
    [
        validateFields
    ],createProduct
)

router.get("/getProducts",getProducts)

export default router;