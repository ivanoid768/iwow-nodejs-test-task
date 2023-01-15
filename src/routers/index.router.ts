import { Router } from "express";
import { authController } from "src/controllers/auth.controller";
import { lawyerController } from "src/controllers/lawyer.controller";
import { timeslotController } from "src/controllers/timeslot.controller";

export const authRouter = Router();
authRouter.post("/login", authController);

export const lawyerRouter = Router();
lawyerRouter.get("/list", lawyerController.getLawyers);

export const timeslotRouter = Router();
timeslotRouter.get("/:lawyerId", timeslotController.getLawyerTimeslots);
