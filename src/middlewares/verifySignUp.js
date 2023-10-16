import { ROLES } from "../models/Rol.model.js";
import User from '../models/User.model.js'

/**
 * Middleware que verifica si ya existe un usuario con el nombre de usuario proporcionado en la solicitud.
 * Si el usuario ya existe, devuelve una respuesta de error con un código de estado 400.
 * Si el usuario no existe, pasa al siguiente middleware en la cadena.
 *
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos enviados por el cliente.
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar una respuesta al cliente.
 * @param {Function} next - Función que permite pasar al siguiente middleware en la cadena.
 * @returns {void}
 */
export const checkDuplicatedUsers = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
        return res.status(400).json({ message: "El nombre de usuario ya existe" });
    }

    next();
};

/**
 * Middleware que verifica si los roles proporcionados en la solicitud existen en la lista de roles válidos.
 * Si algún rol no existe, devuelve una respuesta de error con un código de estado 400.
 * Si todos los roles existen, pasa al siguiente middleware en la cadena.
 *
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos enviados por el cliente.
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar una respuesta al cliente.
 * @param {Function} next - Función que permite pasar al siguiente middleware en la cadena.
 * @returns {void}
 */
export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({ message: `Rol ${req.body.roles[i]} no existe` });
            }
        }
    }

    next();
};
