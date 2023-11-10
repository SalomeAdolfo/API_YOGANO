import axios from "axios"
import { PAYLPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config.js"


export const createOrder = async (req, res) => {
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "100.00"
                }
            },
        ],
        application_context: {
            brand_name: "YOGANO",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3000",
            cancel_url: "http://localhost:3000"
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
    console.log(response.data)

    return res.json("dasdsa")
}