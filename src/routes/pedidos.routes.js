import { Router } from "express";
import { getPedidos, getPedidoById, setNumeroRastreo, showCompradorPedidos } from "../controllers/pedidos.controller.js";
import * as middleAuth from '../middlewares/authJWT.js'

const router = Router()

router.get('/comprador', [middleAuth.verifyToken, middleAuth.Comprador], showCompradorPedidos)
router.get('/', [middleAuth.verifyToken, middleAuth.Administrador], getPedidos)
router.get('/:pedidoId', [middleAuth.verifyToken, middleAuth.middleCompradorAdmin], getPedidoById)
router.put('/:pedidoId', [middleAuth.verifyToken, middleAuth.Administrador], setNumeroRastreo)


export default router