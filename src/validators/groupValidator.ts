import Joi from "joi";


const groupValidator = Joi.object({
    name: Joi.string()
        .regex(/^[a-zA-Z0-9\-]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Only letters min 1 max 20 ch',
            'string.required': "This field is required"
        })
})

export {
    groupValidator
};
