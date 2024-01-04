const { initStripe } = require("../../stripe");
const stripe = initStripe();

const CLIENT_URL = "http://localhost";

// Send cart to Stripe
const createCheckOutSession = async (req, res) => {
  try {
    // Payment begins - start session
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),

      customer: req.session.id,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      currency: "SEK",
    });

    // Send back URL and session-id
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

    // ADD LOGIC HERE TO SAVE ORDER IN MONGODB
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  createCheckOutSession,
  verifySession,
};
