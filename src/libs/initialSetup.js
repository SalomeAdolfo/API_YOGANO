import Role from '../models/Rol.model.js'

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;
        const values = await Promise.all([

            new Role({ name: 'Administrador' }).save(),
            new Role({ name: 'Comprador' }).save(),
        ])
    } catch (error) {
        console.log(error)
    }
}