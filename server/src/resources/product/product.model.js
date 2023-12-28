const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: [
    {
      text: { type: String, required: true },
      brand: { type: String, required: false },
      features: { type: [String], required: false },
      careAdvice: { type: String, required: false },
    },
  ],
  price: [
    {
      unit_amount: { type: Number, required: true },
      currency: { type: String, required: true },
    },
  ],
  image: { type: String, required: true },
  inStock: { type: Number, required: true, default: 0 },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "category",
    required: false,
  },
  deleted: { type: Boolean, required: false, default: false },
});

const ProductModel = models.product || model("product", ProductSchema);

const ProductCreateValidationSchema = Joi.object({
  title: Joi.string().strict().required(),
  description: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().strict().required(),
        brand: Joi.string().strict(),
        features: Joi.array().items(Joi.string().strict()),
        careAdvice: Joi.string().strict(),
      })
    )
    .required(),
  price: Joi.array()
    .items(
      Joi.object({
        unit_amount: Joi.number().strict().required(),
        currency: Joi.string().strict().required(),
      })
    )
    .required(),
  image: Joi.string().uri().allow("image/png", "image/jpeg").required(),
  inStock: Joi.number().strict().required(),
  categories: Joi.array().min(1),
});

const ProductUpdateValidationSchema = ProductCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
  deleted: Joi.boolean().strict().required(),
});

module.exports = {
  ProductModel,
  ProductSchema,
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
};
