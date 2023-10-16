import Product from '../models/Product.model.js'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate({
            path: 'created_by_user',
            select: 'username -_id'
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const createProduct = async (req, res) => {
    try {
        const { name, capacidad, codigo } = req.body

        const foundProduct = await Product.findOne({ material: codigo })

        if (foundProduct) return res.status(400).json({ message: `El material ${material} ya se encuentra registrado.` })

        const newProduct = new Product({ name, capacidad, codigo , created_by_user: req.userId })

        const productSaved = await newProduct.save()

        res.status(201).json(productSaved)
    } catch (e) {
        res.status(422).json(e)
    }
}

export const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.body,
            updated_by_User: req.userId 
        }, {
            new: true
        })
        res.status(200).json(updatedProduct)
    } catch (e) {
        res.status(422).json({ message: e.message })
    }
}

export const deleteProductById = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId)
        return res.status(204).json()
    } catch (error) {
        res.status(400).json({ message: "Producto no encontrado" })
    }
}