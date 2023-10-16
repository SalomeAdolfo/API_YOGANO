import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    capacidad: String,
    codigo: String,
    created_by_user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    updated_by_User: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)