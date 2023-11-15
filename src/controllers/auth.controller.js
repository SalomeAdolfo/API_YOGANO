import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import Role from '../models/Rol.model.js'

export const signUp = async (req, res) => {
try {
    const { name, apellido_paterno, apellido_materno, username, password, roles } = req.body

    const newUser = new User({
        username,
        name,
        apellido_materno,
        apellido_paterno,
        password: await User.encryptPassword(password)
    })

    //Comprobar propiedad roles
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: 'general' })
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    res.status(200).json({ savedUser })
} catch (error) {
    console.log(error.message)
    res.status(400).json(error.message)
}
}

export const signIn = async (req, res) => {
    const { username, password } = req.body
    const userFound = await User.findOne({ username: username }).populate("roles")
    if (!userFound) return res.status(400).json({ message: "Usuario no existente" })

    const matchPassword = await User.comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "Credenciales incorrectas" })
    if (userFound.roles.name === 'Gestión') {
        const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: 60 * 60 * 8 })
        res.cookie('auth', token, { httpOnly: true, sameSite: 'lax', maxAge: 600000 * 6 * 8, signed: true })
        res.status(200).json(token)
    }
    const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: 60 * 60 })
    res.cookie('auth', token, { httpOnly: true, sameSite: 'lax', maxAge: 600000 * 6, signed: true })
    res.status(200).json(token)
}

export const logOut = async (req, res) => {

    res.clearCookie('auth')

    res.status(200).json({ message: "Fin de sesión exitoso" })
}

export const getStatusFromUser = async (req, res) => {
    try {
        const userDescription = await User.findById(req.userId, {
            password: 0,
        }).populate({ path: "roles", select: "-_id name" })

        res.status(200).json(userDescription)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}