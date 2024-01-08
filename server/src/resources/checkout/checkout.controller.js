const { initStripe } = require("../../stripe");
const stripe = initStripe();
const { OrderModel } = require("../order/order.model");

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
      // Shipping address
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      // Available Shipping-options
      shipping_options: shippingOptions,
      line_items: lineItems,
      customer: req.session.id,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`, // Successfull payment - confirmationpage
      cancel_url: CLIENT_URL, // Cancel payment - go back to homepage
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      currency: "sek",
    });

    // Send back URL and session-id
    console.log("SESSION INFO: ", session);
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

    // Check payment status
    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    // Paymeny - success
    const line_items = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );

    const createdDate = new Date(session.created * 1000);
    const formattedDate = createdDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    console.log(typeof formattedDate);

    //ADD CODE HERE FOR CREATE ORDER
    //ID, CREATED, CUSTOMER/USER, EMAIL, PRODUCTS/ORDERITEMS [], TOTAL PRICE
    res.status(200).json({ verified: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ verified: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createCheckOutSession,
  verifySession,
};
