import app from './app.js'
import { API_PORT } from './config.js'
import './database.js'

app.listen(API_PORT)

console.log("Server is already on port ", API_PORT)