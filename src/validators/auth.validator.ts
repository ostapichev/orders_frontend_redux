import Joi from 'joi';

const authValidator = Joi.object({
    email: Joi.string().messages({
        'string.pattern.base': 'This field is must be email!'
    }).required(),
    password: Joi.string().messages({
        'string.pattern.base': 'This field is must be password!'
    })
});

export {
    authValidator
};
