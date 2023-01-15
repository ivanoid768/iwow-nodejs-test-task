import { Request, Response } from "express";
import { logIn } from "src/components/auth.component";

export const authController = async (req: Request, res: Response) => {
    const { phone, password } = req.body;

    try {
        const token = await logIn(phone, password);

        return res.json({
            success: true,
            response: {
                token: token,
            },
        });
    } catch (e) {
        return res.json({
            success: false,
            error: e.message,
        });
    }
};
