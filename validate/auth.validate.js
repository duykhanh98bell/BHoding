const { schema } = require('../models/bankModel');

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const authValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    accName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().min(10).required(),
    gender: Joi.string().min(4).required(),
    dateBirth: Joi.date().format('YYYY-MM-DD').utc().required(),
    addressId: Joi.string().max(200).required(),
    address: Joi.string().max(200).required(),
    idNumber: Joi.string().min(9).required(),
    passport: Joi.string().min(6).required(),
    password: Joi.string().required(),
    otp: Joi.string().min(6).required(),
    invested: Joi.number(),
    dividends: Joi.number(),
    commission: Joi.number(),
    point: Joi.number(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    accName: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().min(10).required(),
    gender: Joi.string().min(4).required(),
    dateBirth: Joi.date().format('YYYY-MM-DD').utc().required(),
    addressId: Joi.string().max(200).required(),
    address: Joi.string().max(200).required(),
    idNumber: Joi.string().min(9).required(),
    passport: Joi.string().min(6).required(),
    password: Joi.string().required(),
    otp: Joi.string().min(6).required(),
    invested: Joi.number(),
    dividends: Joi.number(),
    commission: Joi.number(),
    point: Joi.number(),
  });
  return schema.validate(data);
};

module.exports.authValidation = authValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
