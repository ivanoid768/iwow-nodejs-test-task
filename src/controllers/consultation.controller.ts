import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { createConsultation } from "src/components/consultation.component";
import { ConsultationDTO } from "src/dto/consultation.dto";
import { UserClass } from "src/models/User";

class ConsultationController {
    public async createConsultation(req: Request, res: Response) {
        try {
            const consultationDTO = new ConsultationDTO({
                theme: req.body.theme,
                timeslotId: new ObjectId(req.body.timeslotId) as Types.ObjectId,
            });

            const consultation = await createConsultation(
                req.user as UserClass,
                consultationDTO
            );

            return res.json({
                success: true,
                response: consultation,
            });
        } catch (e) {
            return res.json({
                success: false,
                error: e.message,
            });
        }
    }
}

export const consultationController = new ConsultationController();
