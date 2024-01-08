const { initStripe } = require("../../stripe");
const stripe = initStripe();
const { OrderModel } = require("../order/order.model");
const { ProductModel } = require("../product/product.model");

const CLIENT_URL = "http://localhost:5173";

// Send cart to Stripe
const createCheckOutSession = async (req, res) => {
  try {
    // CartItems
    const lineItems = req.body.items.map((item) => {
      return {
        price: item.product,
        quantity: item.quantity,
      };
    });

    // ShippingMethods - fetch from Stripe
    const shippingRates = await stripe.shippingRates.list({
      limit: 2,
    });

    // Map throught shipping-rates to create a variable for shipping-options
    // They are a part of checkout-session
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

    // Payment begins - start session
    const session = await stripe.checkout.sessions.create({
      // Delivery address
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      shipping_options: shippingOptions, // Available Shipping-options
      line_items: lineItems,
      customer: req.session.id,
      mode: "payment",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      currency: "sek",
      success_url: `${CLIENT_URL}/confirmation`, // Successfull payment - confirmationpage
      cancel_url: CLIENT_URL, // Cancel payment - go back to homepage
    });

    // Send back URL and session-id
    console.log("SESSION INFO: ", session); // RADERA NÄR HELA CHECKOUT ÄR KLAR!!!!!!!
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("ERROR: Something went wrong with the checkout");
  }
};

// Verify session
const verifySession = async (req, res) => {
  try {
    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    console.log("VERIFY SESSION", session);

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
          stripeProductId: item.price.product,
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
        const product = item.description;
        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;
        const stripeProductId = item.price.product;

        return {
          product,
          price,
          currency: item.price.currency,
          quantity,
          stripeProductId,
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

    await Promise.all(
      productStocks.map(async ({ product, quantity }) => {
        // Check inStock before complete the order
        if (product.inStock >= quantity) {
          // Save order in MongoDB
          await newOrder.save();

          // Update inStock
          product.inStock -= quantity;
          await product.save();
        } else {
          throw new Error(
            `Error occurred for product ${product.title}. Not inStock`
          );
        }
      })
    );

    console.log("ORDER: ", newOrder);
    console.log("SESSION-ID: ", req.body.sessionId);
    console.log("Created:", newOrder.createdAt);
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
