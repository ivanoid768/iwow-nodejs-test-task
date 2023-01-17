import { Router } from "express";
import { createValidator } from "express-joi-validation";
import { authController } from "src/controllers/auth.controller";
import { consultationController } from "src/controllers/consultation.controller";
import { lawyerController } from "src/controllers/lawyer.controller";
import { timeslotController } from "src/controllers/timeslot.controller";
import { UserRole } from "src/types.index";
import {
    getTimeslotParamsSchema,
    getTimeslotQuerySchema,
    loginBodySchema,
} from "src/validators/index.validator";

const validator = createValidator();

export const authRouter = Router();
authRouter.post("/login/client", validator.body(loginBodySchema), (req, res) =>
    authController(req, res, UserRole.Client)
);
authRouter.post("/login/lawyer", validator.body(loginBodySchema), (req, res) =>
    authController(req, res, UserRole.Lawyer)
);

export const lawyerRouter = Router();
lawyerRouter.get("/list", lawyerController.getLawyers);

export const timeslotRouter = Router();
timeslotRouter.get(
    "/:lawyerId",
    validator.query(getTimeslotQuerySchema),
    validator.params(getTimeslotParamsSchema),
    timeslotController.getLawyerTimeslots
);

export const consultationRouter = Router();
consultationRouter.post("/", consultationController.createConsultation);
