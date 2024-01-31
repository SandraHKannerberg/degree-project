const { OrderModel } = require("./order.model");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    // Search for the customer email since this are saved in the orderdetails
    const customer = req.session;
    const customerMail = customer.email;

    // Check if it is Admin or a regular user
    const query = req.session.isAdmin ? {} : { email: customerMail };
    // Find orders in database based on the query above
    const orders = await OrderModel.find(query).populate("customer");

    if (orders.length === 0) {
      console.log("No orders found for the customer");
      res.status(203).json("No orders to show");
    } else {
      console.log("Orders find by query", orders);
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log("Error occurred. Can't show orders", error);
    return res.status(400).json("Error occurred with showing orders");
  }
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
