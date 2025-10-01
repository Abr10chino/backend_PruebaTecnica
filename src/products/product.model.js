/*
    Modelo de Producto para la base de datos MongoDB usando Mongoose.
*/

import mongoose from "mongoose";

// Definición del esquema del producto
const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Product ID is required"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    }
})

// Método estático para obtener el siguiente ID disponible dependiendo del último ID en la colección
ProductSchema.statics.getNextId = async function() {
    const lastProduct = await this.findOne().sort({ id: -1 });
    return lastProduct ? lastProduct.id + 1 : 1;
};

// Exportación del modelo de Producto
export default mongoose.model("Product", ProductSchema);