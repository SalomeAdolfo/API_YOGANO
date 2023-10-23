import Pedido from '../models/Pedido.model.js'
import Product from '../models/Product.model.js'

export const createPedido = async (req, res) => {
    try {
        const { cantidad, total_a_pagar, metodo_pago, producto } = req.body

        const foundProduct = await Product.findById(producto)

        if (!foundProduct) return res.status(404).json({ message: "Producto no encontrado" })

        const newPedido = new Pedido({ cantidad, total_a_pagar, metodo_pago, producto, solicitante: req.userId })

        const savedPedido = await newPedido.save()

        if (!savedPedido) return res.status(400).json({ message: "Hubo un error al guardar el pedido, inténtalo de nuevo más tarde." })

        res.status(201).json(savedPedido)
    } catch (error) {
        res.status(500).json({ meesage: error.meesage })
    }
}

export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate({
            path: 'solicitante',
            select: '-_id'
        })
        if(!pedidos) return res.status(404).json({message: "No hay datos aún."})

        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ meesage: error.meesage })
    }
}