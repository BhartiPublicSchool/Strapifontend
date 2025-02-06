import { Joi } from "express-validation";

export const validatePhoneNumber = (phoneNumber: string) => /^[0-9]{10}$/.test(phoneNumber)

export const registerUserValidation = {
    body: Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string().required()
            .email({ minDomainSegments: 2 }),
        phoneNumber: Joi.number().integer().custom((value, helpers) => {
            if (!validatePhoneNumber(value)) return helpers.error("any.invalid");
            return value;
        }),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
        confirmPassword: Joi.ref('password'),
    })
}