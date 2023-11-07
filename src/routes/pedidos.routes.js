import { Router } from "express";
import { createPedido, getPedidos, getPedidoById, setNumeroRastreo } from "../controllers/pedidos.controller.js";
import * as middleAuth from '../middlewares/authJWT.js'

const router = Router()

router.post('/', [middleAuth.verifyToken, middleAuth.Comprador], createPedido)
router.get('/', [middleAuth.verifyToken, middleAuth.Administrador], getPedidos)
router.get('/:pedidoId', [middleAuth.verifyToken, middleAuth.Administrador], getPedidoById)
router.put('/:pedidoId', [middleAuth.verifyToken, middleAuth.Administrador], setNumeroRastreo)

export default router