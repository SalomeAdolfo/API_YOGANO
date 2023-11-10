import { Router } from "express";
import { createOrder } from "../controllers/payments.controller.js";
const router = Router();

router.get('/create-order', createOrder)

export default router;