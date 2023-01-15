import { Request, Response } from "express";
import { getLawyers } from "src/components/lawyer.component";

class LawyerController {
    /**
     * getLawyers
     */
    public async getLawyers(req: Request, res: Response) {
        try {
            const lawyers = await getLawyers();

            return res.json({
                success: true,
                response: {
                    lawyers: lawyers,
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

export const lawyerController = new LawyerController();
