import { main } from '../libs/mailSetup.js'
import Pedido from '../models/Pedido.model.js'
import Product from '../models/Product.model.js'

export const createPedido = async (req, res) => {
    try {
        const { cantidad, total_a_pagar, no_tel, domicilio, correo } = req.body

        const newPedido = new Pedido({ cantidad, total_a_pagar, no_tel, domicilio, solicitante: req.userId, telefono: no_tel, domicilio, correo })

        const savedPedido = await newPedido.save()

        if (!savedPedido) return res.status(400).json({ message: "Hubo un error al guardar el pedido, inténtalo de nuevo más tarde." })

        res.status(201).json(savedPedido)
        console.log(savedPedido)
        main('al222010588@gmail.com', 'Nuevo pedido', `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo pedido</title>
        </head>
        
        <body
            style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0; margin: 0;">
            <section style="width: 25%; padding: 10px; height: 300px; border-radius: 10px; box-shadow: 0px 0px 20px 0px black;">
                <h1 style="color: black; text-align: center; font-weight: 800; font-family: Arial, Helvetica, sans-serif;">Nuevo pedido</h1>
                <p style="color: black; text-align: justify; font-weight: 100; font-family: Arial, Helvetica, sans-serif;">Tienen un nuevo pedido para surtir, por favor verifique su disponibilidad para surtir lo más pronto posible.</p>
            </section>
        </body>
        
        </html>`)
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