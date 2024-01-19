const { model, Schema, models } = require("mongoose");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const OrderItemSchema = new Schema(
  {
    product: { type: String, required: true }, // Title
    quantity: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    // customer: { type: String, required: true },
    email: { type: String, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    totalOrderItemsAmount: { type: Number, required: true }, // Without shipping-price
    totalAmount: { type: Number, required: true }, // Including shipping-price
    deliveryAddress: {
      type: {
        street: { type: String },
        postal_code: { type: String },
        city: { type: String },
        country: { type: String },
      },
      required: true,
    },
    shipped: { type: Boolean, required: false, default: false },
    shippingMethod: {
      type: {
        shipping: { type: String },
        amount_total: { type: Number },
        stripeShippingId: { type: String }, // Called shipping_rate in Stripe
      },
      required: true,
    },
    stripePaymentIntentId: { type: String, required: false, unique: true },
  },
  {
    timestamps: true,
  }
);

// create a unique string as ordernumber with uuid
OrderSchema.pre("save", function (next) {
  const order = this;

  if (!order.orderNumber) {
    order.orderNumber = uuidv4().slice(0, 8);
  }

  next();
});

const OrderModel = models.order || model("order", OrderSchema);

const OrderCreateValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().strict().required(),
        quantity: Joi.number().strict().required(),
        price: Joi.number(),
      })
    )
    .strict()
    .required(),
  deliveryAddress: Joi.object({
    street: Joi.string().strict().required(),
    zipCode: Joi.string().strict().required(),
    city: Joi.string().strict().required(),
    country: Joi.string().strict().required(),
  })
    .strict()
    .required(),
  stripeShippingMethodId: Joi.string().strict().required(),
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
