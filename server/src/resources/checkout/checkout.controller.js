const { initStripe } = require("../../stripe");
const stripe = initStripe();
const { OrderModel } = require("../order/order.model");
const { ProductModel } = require("../product/product.model");

const CLIENT_URL = "http://localhost:5173";
const DEFAULT_CURRENCY = "SEK";

// *********** ENDPOINTS CHECKOUT *********** //

// Send cart to Stripe and create a session
const createCheckOutSession = async (req, res) => {
  try {
    // ShippingMethods are saved in Stripe. Fetch them here from Stripe
    const shippingRates = await stripe.shippingRates.list({
      limit: 2,
    });

    // Map throught shipping-rates to create a variable for shipping-options
    // Shipping options - use in create-session as the value of shipping_options
    const shippingOptions = shippingRates.data.map((rate) => ({
      shipping_rate_data: {
        type: rate.type || "",
        fixed_amount: {
          amount: rate.fixed_amount?.amount || 0,
          currency: rate.fixed_amount?.currency || "",
        },
        display_name: rate.display_name || "",
        delivery_estimate: {
          minimum: {
            unit: rate.delivery_estimate?.minimum?.unit || "",
            value: rate.delivery_estimate?.minimum?.value || 0,
          },
          maximum: {
            unit: rate.delivery_estimate?.maximum?.unit || "",
            value: rate.delivery_estimate?.maximum?.value || 0,
          },
        },
      },
    }));

    // Customer - use in create-session as the value of customer
    const customer = req.body.email;

    // LineItems - use in create-session as the value of line_items
    const lineItems = req.body.items.map((item) => {
      return {
        price_data: {
          currency: DEFAULT_CURRENCY,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    // Payment begins - start session
    const session = await stripe.checkout.sessions.create({
      // Delivery address
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      shipping_options: shippingOptions, // Available Shipping-options
      line_items: lineItems, // With data from database
      customer, // Customers e-mail
      mode: "payment",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/confirmation`, // If payment success
      cancel_url: `${CLIENT_URL}/shop`, // If customer cancel the payment before submit
    });

    // Send back URL and session-id
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("ERROR: Something went wrong with the checkout");
  }
};

// Verify session and payment. Create order after successfull payment
const verifySession = async (req, res) => {
  try {
    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    // Check payment status
    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    // Payment - success
    const line_items = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );

    // Fetch inStock-value from database
    const productStocks = await Promise.all(
      line_items.data.map(async (item) => {
        const product = await ProductModel.findOne({
          title: item.description,
        });
        return {
          product,
          quantity: item.quantity,
        };
      })
    );

    // Create new order
    const newOrder = new OrderModel({
      customer: session.customer_details.name,
      email: session.customer_details.email,
      orderItems: line_items.data.map((item) => {
        const product = item.description; // Product title
        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;

        return {
          product,
          price,
          currency: item.price.currency,
          quantity,
        };
      }),
      totalOrderItemsAmount: session.amount_subtotal / 100,
      totalAmount: session.amount_total / 100,
      deliveryAddress: {
        street: session.shipping_details.address.line1,
        postal_code: session.shipping_details.address.postal_code,
        city: session.shipping_details.address.city,
        country: session.shipping_details.address.country,
      },
      shipped: false,
      shippingMethod: {
        shipping: session.shipping_cost.display_name,
        amount_total: session.shipping_cost.amount_total,
        stripeShippingId: session.shipping_cost.shipping_rate,
      },
      stripePaymentIntentId: session.payment_intent,
    });

    // Check inStock before complete the order
    await Promise.all(
      productStocks.map(async ({ product, quantity }) => {
        if (product.inStock >= quantity) {
          // Update inStock
          product.inStock -= quantity;
          await product.save();
        } else {
          throw new Error(`Error occurred. ${product.title} out of stock`);
        }
      })
    );

    // Save order in MongoDB
    await newOrder.save();

    console.log("ORDER: ", newOrder);
    console.log("SESSION-ID: ", req.body.sessionId);
    res
      .status(200)
      .json({ verified: true, message: "New order successfully created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ verified: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createCheckOutSession,
  verifySession,
};
