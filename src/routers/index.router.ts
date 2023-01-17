import { Router } from "express";
import { authController } from "src/controllers/auth.controller";
import { consultationController } from "src/controllers/consultation.controller";
import { lawyerController } from "src/controllers/lawyer.controller";
import { timeslotController } from "src/controllers/timeslot.controller";
import { UserRole } from "src/types.index";

export const authRouter = Router();
authRouter.post("/login/client", (req, res) => authController(req, res, UserRole.Client));
authRouter.post("/login/lawyer", (req, res) => authController(req, res, UserRole.Lawyer));

export const lawyerRouter = Router();
lawyerRouter.get("/list", lawyerController.getLawyers);

export const timeslotRouter = Router();
timeslotRouter.get("/:lawyerId", timeslotController.getLawyerTimeslots);

export const consultationRouter = Router();
consultationRouter.post("/", consultationController.createConsultation);