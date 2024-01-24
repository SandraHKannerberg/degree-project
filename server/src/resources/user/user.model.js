const { Schema, model, models } = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

const UserModel = models.user || model("user", UserSchema);

const UserCreateValidationSchema = Joi.object({
  firstName: Joi.string().strict().required(),
  lastName: Joi.string().strict().required(),
  email: Joi.string().email().strict().required(),
  password: JoiPassword.string()
    .min(6) //Minimum 6 characters
    .minOfLowercase(1) //Minimum one lowercase charachter
    .minOfNumeric(1) //Minimum one numeric charachter
    .required(),
  isAdmin: Joi.boolean().strict(),
});

module.exports = { UserModel, UserCreateValidationSchema };
