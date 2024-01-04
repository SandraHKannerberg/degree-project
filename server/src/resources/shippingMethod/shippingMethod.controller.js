const { ShippingMethodModel } = require("./shippingMethod.model");

// Add shippingmethod - only admin have access to this function
const addShippingMethod = async (req, res) => {
  const shippingMethod = new ShippingMethodModel(req.body);
  await shippingMethod.save();
  res.status(201).json(shippingMethod);
};

// Get all shippingmethods
const getAllShippingMethods = async (req, res) => {
  const shippingMethods = await ShippingMethodModel.find();
  res.status(200).json(shippingMethods);
};

module.exports = { addShippingMethod, getAllShippingMethods };
