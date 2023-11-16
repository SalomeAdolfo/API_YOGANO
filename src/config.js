import { config } from 'dotenv'

config()

export default {
    SECRET: 'yogano'
}

export const URL_CONNECTION = process.env.URL_CONNECTION
export const API_PORT = process.env.API_PORT || 3007
export const COOKIE_SECRET = process.env.COOKIE_SECRET

export const EMAIL_HOST = process.env.EMAIL_HOST
export const EMAIL_PORT = process.env.EMAIL_PORT
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT

export const PAYLPAL_API = "https://api-m.sandbox.paypal.com"