const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const ProductSchema = new Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: false },
  careAdvice: { type: String, required: false },
  price: { type: Number, required: true },
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
  brand: Joi.string().strict(),
  description: Joi.string().strict().required(),
  features: Joi.array().items(Joi.string().strict()),
  careAdvice: Joi.string().strict(),
  price: Joi.number().strict().required(),
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
