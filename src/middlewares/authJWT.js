import jwt from 'jsonwebtoken'
import config from '../config.js'
import User from '../models/User.model.js'
import Role from '../models/Rol.model.js'

/**
 * Middleware que verifica si el token de acceso proporcionado en el encabezado de la solicitud es válido y decodifica
 * la información del usuario. Si el token es válido, agrega el ID del usuario decodificado (req.userId) al objeto de 
 * solicitud (req) y pasa al siguiente middleware en la cadena.
 * Si el token no está presente o no es válido, devuelve una respuesta de error con un código de estado 401.
 *
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos enviados por el cliente, incluyendo el token en el encabezado.
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar una respuesta al cliente.
 * @param {Function} next - Función que permite pasar al siguiente middleware en la cadena.
 * @returns {void}
 */
export const verifyToken = async (req, res, next) => {
    try {
        let token;

        // Verificar si se envió un token en el header "x-access-token"
        if (req.headers["x-access-token"]) {
            token = req.headers["x-access-token"];
        } else if (req.signedCookies.auth) {
            // Verificar si se envió un token en la cookie "nombreDeLaCookie"
            token = req.signedCookies.auth;
        }

        // Si no se proporcionó un token en el header ni en la cookie
        if (!token) {
            return res.status(403).json({ message: "No se ha recibido ningún token" });
        }

        const decoded = jwt.verify(token, config.SECRET);

        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
};

/**
 * Middleware que verifica si el usuario tiene los permisos adecuados para acceder a las rutas relacionadas con el
 * almacén general. Verifica si el usuario tiene los roles "Almacen_supervisores", "Almacen_operadores" o "Administrador".
 * Si el usuario tiene alguno de estos roles, pasa al siguiente middleware en la cadena.
 * Si el usuario no tiene los roles adecuados, devuelve una respuesta de error con un código de estado 403.
 *
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos enviados por el cliente, incluyendo el ID del usuario (req.userId).
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar una respuesta al cliente.
 * @param {Function} next - Función que permite pasar al siguiente middleware en la cadena.
 * @returns {void}
 */
export const Administrador = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Administrador') {
            next();
            return;
        }
    }

    return res.status(403).json({ message: "No tienes los permisos suficientes" });
};

/**
 * Middleware que verifica si el usuario tiene los permisos adecuados para realizar actualizaciones relacionadas con el
 * almacén. Verifica si el usuario tiene los roles "Almacen_supervisores", "Almacen_operadores", "Administrador" o "Producción".
 * Si el usuario tiene alguno de estos roles, pasa al siguiente middleware en la cadena.
 * Si el usuario no tiene los roles adecuados, devuelve una respuesta de error con un código de estado 403.
 *
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos enviados por el cliente, incluyendo el ID del usuario (req.userId).
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar una respuesta al cliente.
 * @param {Function} next - Función que permite pasar al siguiente middleware en la cadena.
 * @returns {void}
 */
export const Comprador= async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Comprador') {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "No tienes los permisos suficientes" });
};


export const middleCompradorAdmin= async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Comprador' || roles[i].name === 'Administrador') {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "No tienes los permisos suficientes" });
};

