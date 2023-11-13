import { Router } from "express";
import { createOrder, captureOrder } from "../controllers/payments.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";
const router = Router();

router.post('/create-order', [verifyToken] ,createOrder)
router.get('/capture-order', [verifyToken], captureOrder)
export default router;