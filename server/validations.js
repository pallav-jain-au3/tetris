const Joi = require('@hapi/joi')

exports.registerValidation = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()

    })

    const validatedUser = schema.validate(user)
    return validatedUser.error
}

exports.loginValidation = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()

    })

    const validatedUser = schema.validate(user)
    return validatedUser.error
}