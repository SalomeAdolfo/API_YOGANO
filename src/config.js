import { config } from 'dotenv'

config()

export default {
    SECRET: 'yogano'
}

export const URL_CONNECTION = process.env.URL_CONNECTION
export const API_PORT = process.env.API_PORT || 3007
export const COOKIE_SECRET = process.env.COOKIE_SECRET