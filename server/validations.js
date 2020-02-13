const Joi = require("@hapi/joi");

exports.registerValidation = user => {
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
  });

  const validatedUser = schema.validate(user);
  return {
    valid: !validatedUser.error ? true : false,
    error: !validatedUser.error
      ? null
      : {
          [validatedUser.error.details[0].path]:
            validatedUser.error.details[0].message
        }
  };
};

exports.loginValidation = user => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  const validatedUser = schema.validate(user);
  return {
    valid: !validatedUser.error ? true : false,
    error: !validatedUser.error
      ? null
      : {
          [validatedUser.error.details[0].path]:
            validatedUser.error.details[0].message
        }
  };
};
