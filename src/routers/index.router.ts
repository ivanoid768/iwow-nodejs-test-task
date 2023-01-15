import { Router } from "express";
import { authController } from "src/controllers/auth.controller";
import { lawyerController } from "src/controllers/lawyer.controller";

export const authRouter = Router();
authRouter.post("/login", authController);

export const lawyerRouter = Router();
lawyerRouter.get("/list", lawyerController.getLawyers);
