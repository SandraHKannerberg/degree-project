const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const AddressSchema = new Schema(
  {
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
      default: Math.floor(Math.random() * 1000000),
    },
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: AddressSchema, required: true },
    shipped: { type: Boolean, required: false, default: false },
    shippingMethod: {
      type: Schema.Types.ObjectId,
      ref: "shippingMethod",
      required: true,
    },
    stripePaymentIntentId: { type: String, required: false, unique: true },
  },
  {
    timestamps: true,
  }
);

const OrderModel = models.order || model("order", OrderSchema);

const OrderCreateValidationSchema = Joi.object({
  orderNumber: Joi.number().required(),
  customer: Joi.string().required(),
  orderItems: Joi.array().items(OrderItemSchema).required(),
  totalAmount: Joi.number().required(),
  deliveryAddress: AddressSchema.required(),
  shipped: Joi.boolean().default(false),
  shippingMethod: Joi.string().strict().required(),
  stripePaymentIntentId: Joi.string(),
});

const OrderUpdateValidationSchema = OrderCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

module.exports = {
  OrderModel,
  OrderCreateValidationSchema,
  OrderUpdateValidationSchema,
};
