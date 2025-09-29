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

export const findProductById = async(req, res) => {

    const {id} = req.params;

    const product = await Product.findOne({id});

    if (!product) {
        return res.status(400).json({
            msg: `The product with id ${id} does not exist`
        })
    }

    if (product.status === "INACTIVE") {
        return res.status(400).json({
            msg: `The product with id ${id} is inactive`
        })
    }

    res.status(200).json({
        msg: `The product with id ${id} is: `,
        product
    })

}

export const deleteProduct = async(req, res) => {
    
    const {id} = req.params;

    await Product.findOneAndUpdate({id}, {status: "INACTIVE"});

    const product = await Product.findOne({id});

    if (!product) {
        return res.status(400).json({
            msg: `The product with id ${id} does not exist`
        })
    }

    res.status(200).json({
        msg: `The product with id ${id} has been deleted`
    })

}