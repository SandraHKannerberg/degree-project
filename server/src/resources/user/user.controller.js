const { UserModel } = require("../user/user.model");
const bcrypt = require("bcrypt");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

// Register a new user
async function registerNewUser(req, res) {
  // Check if the user exists, search if e-mail is registred
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json("Email already registred");
  }

  const user = new UserModel(req.body);

  try {
    // Hash the password
    user.password = await bcrypt.hash(user.password, 10);

    // Save new user to MongoDB
    await user.save();

    // // Create a customer in Stripe
    // const stripeCustomer = await stripe.customers.create({
    //   email: user.email,
    //   name: user.firstName + " " + user.lastName,
    // });

    // // Attach the Stripe customer ID to the user in MongoDB
    // user.stripeCustomerId = stripeCustomer.id;
    // await user.save();

    // Delete the password before user info are send as 201 status
    const jsonUser = user.toJSON();
    jsonUser._id = user._id;
    delete jsonUser.password;

    res.status(201).send(jsonUser);
  } catch (err) {
    console.error("Error register new user:", err);
    res.status(500).json("Internal Server Error");
  }
}

// Log in the user
async function login(req, res) {
  try {
    // Check if username and password is correct
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    }).select("+password");

    if (
      !existingUser ||
      !(await bcrypt.compare(req.body.password, existingUser.password))
    ) {
      return res.status(401).json("Wrong e-mail or password");
    }

    // Delete the password before user info are sent to session
    const user = existingUser.toJSON();
    user._id = existingUser._id;
    delete user.password;

    // Check if user already is logged in
    if (req.session._id) {
      return res.status(200).json(user);
    }

    // Save info about the user to the session (an encrypted cookie stored on the client)
    req.session = user;
    res.status(200).json(user);
  } catch (err) {
    console.error("Error occurred - log in failed:", err);
    res.status(500).json("Internal Server Error");
  }
}

// Logout the user and remove the cookie and session
async function logout(req, res) {
  if (!req.session._id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  req.session = null;
  res.status(204).json(null);
}

// Check authorization
async function authorize(req, res) {
  if (!req.session._id) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session);
}

module.exports = { registerNewUser, login, logout, authorize };
