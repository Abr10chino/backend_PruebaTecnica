/*
    Rutas para productos
*/

import { Router } from "express";
import { check } from "express-validator";

import { createProduct, getProducts, findProductById, deleteProduct } from "./product.controller.js";

import { validateFields } from "../middlewares/validateFields.js";

// Definición de rutas
const router = Router();

// Crear un nuevo producto
router.post("/addProduct",
    [
        validateFields
    ],createProduct
)

// Obtener todos los productos
router.get("/getProducts",getProducts)

// Obtener un producto por su ID
router.get("/findProductById/:id",
    [
        check("id", "The Id must be a number").isNumeric(),
        validateFields
    ],findProductById
)

// Eliminar un producto por su ID
router.delete("/deleteProduct/:id",
    [
        check("id", "The Id must be a number").isNumeric(),
        validateFields
    ],deleteProduct
)

export default router;