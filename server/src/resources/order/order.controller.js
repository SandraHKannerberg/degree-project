const { OrderModel } = require("./order.model");
const { ProductModel } = require("../product/product.model");

// Get all orders
const getAllOrders = async (req, res) => {
  const query = req.session.isAdmin ? {} : { customer: req.session._id };
  const orders = await OrderModel.find(query).populate("customer");
  res.status(200).json(orders);
};

// Get a single order by id
const getOrder = async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
    .populate("customer")
    .populate("orderItems.product")
    .populate("shippingMethod");
  if (
    !req.session.isAdmin &&
    req.session._id.toString() !== order.customer._id.toString()
  ) {
    return res
      .status(403)
      .json("You don not have permissions to perform this request");
  }
  res.status(200).json(order);
};

// Function to mark an order as shipped - requires admin access
async function markAsShipped(req, res) {
  const order = await OrderModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shipped: true } },
    { new: true }
  );

  res.status(200).json(order);
}

module.exports = {
  getAllOrders,
  getOrder,
  markAsShipped,
};
