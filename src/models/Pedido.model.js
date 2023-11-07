import { Schema, model } from "mongoose";

const pedidoSchema = new Schema({
    cantidad: Number,
    total_a_pagar: Number,
    metodo_pago: String,
    //Esto es referencia para los productos
    producto: {
        ref: 'Product',
        type: Schema.Types.ObjectId
    },
    //Esto es referencia para los usuarios (token)
    solicitante: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    no_envio: String,
    domicilio: String,
    cod_postal: Number,
    telefono: Number
}, {
    timestamps: true,
    versionKey: false
})

export default model('Pedido', pedidoSchema)