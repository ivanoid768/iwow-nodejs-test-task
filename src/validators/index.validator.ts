import Joi from "joi";
import { passwordRegexp, phoneRegexp } from "src/common.index";

export const loginBodySchema = Joi.object({
    phone: Joi.string().pattern(phoneRegexp).required(),
    password: Joi.string().pattern(passwordRegexp).required(),
});

export const getTimeslotQuerySchema = Joi.object({
    page: Joi.number().integer().positive(),
    perPage: Joi.number().integer().positive(),
    fromDate: Joi.date(),
    toDate: Joi.date(),
});

export const getTimeslotParamsSchema = Joi.object({
    lawyerId: Joi.string().hex().required(),
});

export const saveConsultationParamsSchema = Joi.object({
    theme: Joi.string().allow("").max(300).required(),
    timeslotId: Joi.string().hex().required(),
});
