import bcryptjs from "bcryptjs";

import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: String,
    apellido_paterno: String,
    apellido_materno: String,
    username:{
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcryptjs.compare(password, receivedPassword)
}

export default model('User', userSchema)