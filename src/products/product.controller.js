import Product from "./product.model.js";

export const createProduct = async(req, res) => {

    const {name, description, price, stock, category} = req.body;

    const nextId = await Product.getNextId();

    const product = new Product({
        id: nextId,
        name,
        description,
        price,
        stock,
        category
    })

    await product.save();

    res.status(200).json({
        msg: `Product ${name} created successfully`
    })

}

export const getProducts = async(req, res) => {

    const {limit, from} = req.query;

    const query = {status: "ACTIVE"};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).skip(Number(from)).limit(Number(limit))
    ]);

    res.status(200).json({
        msg: `The ${total} products are: `,
        products
    })
}