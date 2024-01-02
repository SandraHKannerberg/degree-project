const { ProductModel } = require("./product.model");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

// *********** ENDPOINTS PRODUCTS *********** //

// GET all existing products
async function getAllProducts(req, res) {
  const products = await ProductModel.find({ deleted: false });

  console.log("Productlist: ", products);
  res.status(200).json(products);
}

//GET a single product by id
async function getProduct(req, res) {
  const product = await ProductModel.findOne({
    _id: req.params.id,
    deleted: false,
  });
  res.status(200).json(product);
}

// GET products by category
async function getProductsByCategory(req, res) {
  const products = await ProductModel.find({
    categories: { $in: [req.params.id] },
  });
  res.status(200).json(products);
}

// Add a new product
async function addProduct(req, res, next) {
  try {
    console.log("Incoming JSON:", req.body);
    const product = new ProductModel(req.body);
    await product.save();
    await createProductInStripe(product);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// Update a product
async function updateProduct(req, res) {
  if (req.body._id !== req.params.id) {
    return res.status(400).json("Body and param id are not the same");
  }

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(product);
}

// Delete a product
async function deleteProduct(req, res) {
  await ProductModel.findOneAndDelete({ _id: req.params.id });
  res.status(204).json(null);
}

// *********** SYNC TO STRIPE *********** //

// Create a product in Stripe and update MongoDB database with Stripe ID
async function createProductInStripe(product) {
  try {
    // Create the product in Stripe and connect with the price
    const stripeProduct = await stripe.products.create({
      name: product.title,
      description: product.description,
      images: [product.image],
      metadata: { mongoDBId: product._id.toString() },
    });

    // Create the price in Stripe
    const price = await stripe.prices.create({
      unit_amount: product.price * 100,
      currency: "sek",
      product: stripeProduct.id,
    });

    // Update the database with Stripe ID
    await ProductModel.findByIdAndUpdate(product._id, {
      stripeProductId: price.product,
    });

    return stripeProduct;
  } catch (error) {
    console.error("Error occurred - can't sync product with Stripe:", error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
