import Joi from "joi";

const userValidator = Joi.object({
    name: Joi.string()
        .regex(/^[a-zа-яёіA-ZА-ЯЇЁ]{1,20}$/)
        .required()
        .messages({
            'string.pattern.base': 'Only letters min 1 max 20 ch',
            'string.required': 'This field is required!'
        }),
    surname: Joi.string()
        .regex(/^[a-zа-яёіA-ZА-ЯЇЁ]{1,20}$/)
        .required()
        .messages({
            'string.pattern.base': 'Only letters min 1 max 20 ch',
            'string.required': 'This field is required!'
        }),
    email: Joi.string()
        .required()
        .messages({
            'string.pattern.base': 'This field only for email!',
            'string.required': 'This field is required!'
        }),
})

export {
    userValidator
};