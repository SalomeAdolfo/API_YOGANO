import { Router } from "express";
import { createPedido, getPedidos } from "../controllers/pedidos.controller.js";
import * as middleAuth from '../middlewares/authJWT.js'

const router = Router()

router.post('/', [middleAuth.verifyToken, middleAuth.Comprador], createPedido)
router.get('/', [middleAuth.verifyToken, middleAuth.Administrador], getPedidos)

export default router