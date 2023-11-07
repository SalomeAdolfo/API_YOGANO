import { main } from '../libs/mailSetup.js'
import Pedido from '../models/Pedido.model.js'
import Product from '../models/Product.model.js'

export const createPedido = async (req, res) => {
    try {
        const { cantidad, total_a_pagar, no_tel, domicilio } = req.body

        const newPedido = new Pedido({ cantidad, total_a_pagar, no_tel, domicilio, solicitante: req.userId, telefono: no_tel, domicilio })

        const savedPedido = await newPedido.save()

        if (!savedPedido) return res.status(400).json({ message: "Hubo un error al guardar el pedido, inténtalo de nuevo más tarde." })

        res.status(201).json(savedPedido)
        main('al222010588@gmail.com', 'Nuevo pedido', 'Tienes un pedido!!!!')
    } catch (error) {
        res.status(500).json({ meesage: error.meesage })
    }
}

export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate({
            path: 'solicitante',
            select: '-_id -password'
        })
        if (!pedidos) return res.status(404).json({ message: "No hay datos aún." })

        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ meesage: error.meesage })
    }
}

export const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.pedidoId).populate({
            path: 'solicitante',
            select: '-_id -password'
        })
        if (!pedido) return res.status(404).json({ message: "Pedido no encontrado." })

        res.status(200).json(pedido)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const setNumeroRastreo = async (req, res) => {
    try {
        const { no_envio } = req.body
        const pedido = await Pedido.findByIdAndUpdate(req.params.pedidoId, { no_envio })
        if (!pedido) return res.status(404).json({ message: "Pedido no actualizado" })

        main('al222010588@gmail.com', 'Número de rastreo asignado.', `El número de rastreo asignado de DHL es ${no_envio}`)
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}