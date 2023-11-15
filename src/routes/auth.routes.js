import { Router } from "express";
import { signIn, signUp, logOut, getStatusFromUser } from "../controllers/auth.controller.js";
import { checkDuplicatedUsers, checkRolesExisted } from "../middlewares/verifySignUp.js";
import { verifyToken } from "../middlewares/authJWT.js";
const router = Router();

router.post('/signIn', signIn)
router.post('/signUp', [checkDuplicatedUsers, checkRolesExisted], signUp)

router.get('/logOut', logOut)

router.get('/checkUser', [verifyToken], getStatusFromUser)

export default router;