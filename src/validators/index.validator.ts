import Joi from "joi";
import { passwordRegexp, phoneRegexp } from "src/common.index";

export const loginBodySchema = Joi.object({
    phone: Joi.string().pattern(phoneRegexp),
    password: Joi.string().pattern(passwordRegexp),
});
