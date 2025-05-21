import { loginController, registerController, verifyEmailController } from "@/controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.route('/register').post(registerController);
authRoutes.route('/login').post(loginController);
authRoutes.route('/verify-email/:token').get(verifyEmailController);

export default authRoutes;