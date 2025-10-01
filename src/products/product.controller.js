/*
    Controlador para manejar las operaciones relacionadas con los productos.
*/

import Product from "./product.model.js";

// Crear un nuevo producto
export const createProduct = async(req, res) => {

    // Extraer los datos del cuerpo de la petición
    const {name, description, price, stock, category} = req.body;

    // Obtener el siguiente ID disponible
    const nextId = await Product.getNextId();

    // Crear una nueva instancia del producto
    const product = new Product({
        id: nextId,
        name,
        description,
        price,
        stock,
        category
    })

    // Guardar el producto en la base de datos
    await product.save();

    // Responder con un mensaje de éxito
    res.status(200).json({
        msg: `Product ${name} created successfully`
    })

}

// Obtener todos los productos activos con paginación
export const getProducts = async(req, res) => {

    // Obtener la cantidad de productos a mostrar y el índice desde donde empezar
    const {limit, from} = req.query;

    // Consulta para obtener los productos activos
    const query = {status: "ACTIVE"};

    // Encuentra los productos Activos y cuenta el total de productos activos
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).skip(Number(from)).limit(Number(limit))
    ]);

    // Responder con el total de productos y la lista de productos encontrados
    res.status(200).json({
        msg: `The ${total} products are: `,
        products
    })
}

// Buscar un producto por su ID
export const findProductById = async(req, res) => {

    // Extraer el ID del parámetro de la petición
    const {id} = req.params;

    // Buscar el producto por su ID
    const product = await Product.findOne({id});

    // Si el producto no existe, responder con un error
    if (!product) {
        return res.status(400).json({
            msg: `The product with id ${id} does not exist`
        })
    }

    // Si el producto esta inactivo, responder con un error
    if (product.status === "INACTIVE") {
        return res.status(400).json({
            msg: `The product with id ${id} is inactive`
        })
    }

    // Responder con el producto encontrado
    res.status(200).json({
        msg: `The product with id ${id} is: `,
        product
    })

}

// Actualizar un producto por su ID
export const deleteProduct = async(req, res) => {
    
    // Extraer el ID del parámetro de la petición
    const {id} = req.params;

    // Esperar y Actualizar el estado del producto a "INACTIVE"
    await Product.findOneAndUpdate({id}, {status: "INACTIVE"});

    // Verificar si el producto existe
    const product = await Product.findOne({id});

    // Si el producto no existe, responder con un error
    if (!product) {
        return res.status(400).json({
            msg: `The product with id ${id} does not exist`
        })
    }

    // Responder con un mensaje de éxito
    res.status(200).json({
        msg: `The product with id ${id} has been deleted`
    })

}