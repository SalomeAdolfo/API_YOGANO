import axios from "axios"
import { main } from '../libs/mailSetup.js'
import Pedido from '../models/Pedido.model.js'
import { PAYLPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from '../config.js'

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

        main(`${pedido.correo}`, 'Número de rastreo asignado.', `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo pedido</title>
        </head>
        
        <body
            style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0; margin: 0;">
            <sectio>
                <div className='card__detalle_pedido'>
                    <h2 className='fw-bold text-center text-info m-2 p-2'>Datos del pedido</h2>
                    <p className='fw-lighter'>Domicilio: <span className='fw-bold'>${pedido.domicilio}</span></p>
                    <p className='fw-lighter'>Teléfono: <span className='fw-bold'>${pedido.telefono}</span></p>
                    <p className='fw-lighter'>Fecha de solicitud: <span className='fw-bold'>${pedido.createdAt}</span></p>
                    <p className='fw-lighter'>Cantidad de productos: <span className='fw-bold'>${pedido.cantidad}</span></p>
                    <p className='fw-lighter'>Total de pago: <span className='fw-bold'>${pedido.total_a_pagar}</span></p>
                    <p className='fw-lighter'>Número de rastreo de paquete: ${no_envio} </p>
                </div>
                </section>
        </body>
        
        </html>`)
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const showCompradorPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({ solicitante: req.userId }).populate({
            path: 'solicitante',
            select: '-_id -password'
        })
        if (!pedidos) return res.status(404).json({ message: "No hay datos aún." })

        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ meesage: error.meesage })
    }
}