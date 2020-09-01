const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const bankValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};
module.exports.bankValidation = bankValidation;
