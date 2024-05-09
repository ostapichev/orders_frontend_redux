import Joi from "joi";

const orderValidator = Joi.object({
    group: Joi.number()
        .messages({
            'number.base': 'Group selection is required'
        }),
    name: Joi.string()
        .regex(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
        .required()
        .messages({
            'string.pattern.base': 'First letter uppercase min 2 max 20 ch',
            'string.required': "This field is required"
        }),
    surname: Joi.string()
        .regex(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
        .messages({
            'string.pattern.base': 'First letter uppercase min 2 max 20 ch'
        }),
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
        .messages({
            'string.email': 'Email must have a domain only "com" and "net"'
        }),
    phone: Joi.string()
        .regex(/^\d{12}$/)
        .messages({
            'string.pattern.base': 'Phone must have only 12 digits'
        }),
    age: Joi.number()
        .integer()
        .min(16)
        .max(90)
        .messages({
            'number.base': 'Invalid age',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age must be at least 16',
            'number.max': 'Age cannot be more than 90'
        }),
    sum: Joi.number()
        .integer()
        .min(1)
        .max(1000000)
        .messages({
            'number.base': 'Invalid sum',
            'number.integer': 'Sum must be an integer',
            'number.min': 'Sum must be at least 1',
            'number.max': 'Sum cannot be more than 1000000'
        }),
    already_paid: Joi.number()
        .integer()
        .min(1)
        .max(1000000)
        .messages({
            'number.base': 'Invalid field already paid',
            'number.integer': 'Already paid must be an integer',
            'number.min': 'Already paid must be at least 1',
            'number.max': 'Already paid cannot be more than 1000000'
        }),
    course: Joi.string()
        .valid('FS', 'QACX', 'JSCX', 'JCX', 'FE', 'PCX')
        .messages({
            'string.only': 'Invalid course selection'
        }),
    course_format: Joi.string()
        .valid('static', 'online')
        .messages({
            'string.only': 'Invalid course format selection'
        }),
    course_type: Joi.string()
        .valid('pro', 'minimal', 'premium', 'incubator', 'vip')
        .messages({
            'string.only': 'Invalid course type selection'
        }),
    status: Joi.string()
        .valid('in_work', 'new_order', 'agree', 'disagree', 'dubbing')
        .required()
        .messages({
            'string.only': 'Invalid status selection'
        })
});

export {
    orderValidator
};
