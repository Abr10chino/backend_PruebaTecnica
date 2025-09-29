import { Router } from "express";
import { check } from "express-validator";

import { createProduct, getProducts, findProductById, deleteProduct } from "./product.controller.js";

import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.post("/addProduct",
    [
        validateFields
    ],createProduct
)

router.get("/getProducts",getProducts)

router.get("/findProductById/:id",
    [
        check("id", "The Id must be a number").isNumeric(),
        validateFields
    ],findProductById
)

router.delete("/deleteProduct/:id",
    [
        check("id", "The Id must be a number").isNumeric(),
        validateFields
    ],deleteProduct
)

export default router;