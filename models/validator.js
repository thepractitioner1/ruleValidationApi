const Joi = require("joi");



function validate(request) {
    const schema = Joi.object({
        rule: Joi.object().keys({
            field: Joi.alternatives(Joi.string(), Joi.number()).required().messages(alternativeHelper("field", ['string', 'number'])),
            condition: Joi.string().required().messages(stringHelper("condition")),
            condition_value: Joi.alternatives(Joi.string(), Joi.number()).required().messages(alternativeHelper("condition_value", ['string', 'number']))
        }).required().messages(objectHelper("rule")),
        data: Joi.alternatives(Joi.string(), Joi.array(), Joi.object()).required().messages(alternativeHelper("data", ['array', 'string', 'object']))
    });

    return schema.validate(request);
}


function stringHelper(field) {
    const object = {
        'string.base': `${field} should be a|an String.`,
        'any.required': ` ${field} is required.`
    }
    return object;
}


function alternativeHelper(field, array) {
    const object = {
        'alternatives.types': `${field} should be a|an ${array}.`,
        'any.required': `${field} is required.`
    }
    return object;
}

function numberHelper(field) {
    const object = {
        'number.base': `${field} should be a|an Number.`,
        'any.required': ` ${field} is required.`
    }
}

function objectHelper(field){
    const object = {
        'object.base': `${field} should be an Object.`,
        'any.required': `${field} is required.`
    }
    return object;
}

exports.validate = validate;