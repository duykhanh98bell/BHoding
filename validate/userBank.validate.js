const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const userBankValidation = (data) => {
  const schema = Joi.object({
    bank_id: Joi.required(),
    cardNumber: Joi.string().min(12).max(12).required(),
    accNumber: Joi.string().min(12).max(12).required(),
    fullName: Joi.string().min(6).required(),
    idNumber: Joi.string().min(9).required(),
    money: Joi.number().required(),
  });
  return schema.validate(data);
};
module.exports.userBankValidation = userBankValidation;
