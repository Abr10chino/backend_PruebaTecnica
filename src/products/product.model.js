import mongoose from "mongoose";

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

ProductSchema.statics.getNextId = async function() {
    const lastProduct = await this.findOne().sort({ id: -1 });
    return lastProduct ? lastProduct.id + 1 : 1;
};

export default mongoose.model("Product", ProductSchema);