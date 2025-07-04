import { Router } from "express";
import * as authController from "../controllers/authController";
import { validate } from "../middlewares/validationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/profile", authMiddleware, authController.getProfile);

export default router;
