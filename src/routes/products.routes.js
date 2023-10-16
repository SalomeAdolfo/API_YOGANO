import { Router } from "express";
import { getProducts, createProduct, updateProductById, deleteProductById } from "../controllers/products.controller.js";
import * as middleAuth from "../middlewares/authJWT.js";
const router = Router()

//Ruta para el listado de todos los productos
router.get('/', getProducts) //*Ruta pública
//Ruta para obtener un producto por Id

//Ruta para crear un producto
router.post('/', [middleAuth.verifyToken, middleAuth.Administrador], createProduct)

//Ruta para actualizar un producto por id
router.put('/:productId', [middleAuth.verifyToken, middleAuth.Administrador], updateProductById)

//Ruta para borrar un producto por id
router.delete('/:productId', [middleAuth.verifyToken, middleAuth.Administrador], deleteProductById)

export default router
