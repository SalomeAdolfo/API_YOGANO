import axios from "axios"
import { PAYLPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config.js"
import Pedido from '../models/Pedido.model.js'
import { main } from "../libs/mailSetup.js"

let userOrder = undefined

export const createOrder = async (req, res) => {
    const { cantidad, total_a_pagar, no_tel, domicilio, correo } = req.body

    userOrder = { cantidad, total_a_pagar, telefono: no_tel, domicilio, correo, solicitante: req.userId }
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "MXN",
                    value: `${total_a_pagar}`
                }
            }

        ],
        application_context: {
            brand_name: "YOGANO",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http://127.0.0.1:3005/api/payment/capture-order",
            cancel_url: "http://127.0.0.1:3005/"
        }
    }

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials')

    const { data: { access_token } } = await axios.post(`${PAYLPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })
    const response = await axios.post(`${PAYLPAL_API}/v2/checkout/orders`, order, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })

    console.log(response.data.links[1])

    res.status(200).json({ link: response.data.links[1].href })
}

export const captureOrder = async (req, res) => {

    const { token } = req.query
    const { cantidad, total_a_pagar, domicilio, solicitante, telefono, correo } = userOrder
    const response = await axios.post(`${PAYLPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    console.log(response.data.status)
    if (response.data.status === 'COMPLETED') {
        const newPedido = new Pedido({ cantidad, total_a_pagar, domicilio, solicitante, telefono, correo })

        const savedPedido = await newPedido.save()

        if (!savedPedido) return res.status(400).json({ message: "Hubo un error al guardar el pedido, inténtalo de nuevo más tarde." })

        main('al222010588@gmail.com', 'Nuevo pedido a surtir', `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo pedido</title>
</head>

<body
    style="font-family: Arial, Helvetica, sans-serif;width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0; margin: 0;">
    <section style="padding: 100px; box-shadow: 0px 0px 20px 1px black;border-radius: 10px;">
        <h1 style="text-align: center;margin-bottom: 30px; font-size: 40px">Nuevo pedido</h1>
        <p style="font-size: 25px;">Tienes un nuevo <b>pedido</b> por surtir.</p>
        <p style="font-size: 25px;">Agradecemos tu pronta atención a nuestro cliente.</p>
        <p style="font-size: 25px; text-align: center;"><b>Saludos</b></p>
    </section>
</body>

</html>
        `)
        return res.send("Orden pagada, puedes cerrar esta pestaña.")
    }
    return res.send("Hubo un error al procesar la order, inténtalo de nuevo más tarde.")
}