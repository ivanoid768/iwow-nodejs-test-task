import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { getTimeslots } from "src/components/timeslot.component";

class TimeslotController {
    public async getLawyerTimeslots(req: Request, res: Response) {
        try {
            let fromDate = null;
            let toDate = null;

            if (req.query.fromDate) {
                fromDate = new Date(req.query.fromDate as string);
            }

            if (req.query.toDate) {
                toDate = new Date(req.query.toDate as string);
            }

            const timeslots = await getTimeslots(
                req.params.lawyerId,
                req.query.page as unknown as number,
                req.query.perPage as unknown as number,
                fromDate,
                toDate
            );

            return res.json({
                success: true,
                response: {
                    total: timeslots.total,
                    size: timeslots.timeslots.length,
                    timeslots: timeslots.timeslots,
                },
            });
        } catch (e) {
            return res.json({
                success: false,
                error: e.message,
            });
        }
    }
}

export const timeslotController = new TimeslotController();
