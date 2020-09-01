const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const investmentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    sellingTime: Joi.date().format('YYYY-MM-DD').utc(),
    status: Joi.required(),
  });
  return schema.validate(data);
};
module.exports.investmentValidation = investmentValidation;
