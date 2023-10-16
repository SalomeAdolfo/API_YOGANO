import mongoose from "mongoose";
import { URL_CONNECTION } from "./config.js";

const connectionString = URL_CONNECTION

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("Db is connected"))
    .catch(error => {
        console.log("Erro en la conexión a mongo: ", error.message)
    })