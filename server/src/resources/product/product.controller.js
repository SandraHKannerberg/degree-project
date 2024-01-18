const { ProductModel } = require("./product.model");
const {
  createProductInStripe,
  syncUpdateProductWithStripe,
} = require("./product.stripe");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

// *********** ENDPOINTS PRODUCTS *********** //

// GET all existing products
async function getAllProducts(req, res) {
  const products = await ProductModel.find({ deleted: false });
  res.status(200).json(products);
}

// GET a single product by id
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

// Create a new product
async function createProduct(req, res, next) {
  try {
    console.log("Incoming JSON:", req.body);
    const newProduct = new ProductModel(req.body);

    let stripeProduct, stripePrice;

    // Create product in Stripe - call the function createProductInStripe from product.stripe.js
    try {
      stripeProduct = await createProductInStripe(newProduct);
    } catch (stripeError) {
      throw new Error(
        `Failed to create product in Stripe: ${stripeError.message}`
      );
    }

    // Sync with Stripe and save Stripe ID in MongoDB
    newProduct.stripeProductId = stripeProduct.id;

    // Fetch prices for the created product in Stripe
    try {
      const stripePrices = await stripe.prices.list({
        product: stripeProduct.id,
      });

      stripePrice = stripePrices.data[0];
    } catch (stripeError) {
      throw new Error(
        `Failed to fetch prices for product from Stripe: ${stripeError.message}`
      );
    }

    // Save Stripe Price ID in MongoDB
    newProduct.stripePriceId = stripePrice.id;

    // Save product in MongoDB
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
}

// Update a product
async function updateProduct(req, res) {
  if (req.body._id !== req.params.id) {
    return res.status(400).json("Body and param id are not the same");
  }

  try {
    // Fetch the existing product from MongoDB
    const existingProduct = await ProductModel.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json("Product not found");
    }

    // Perform the update in MongoDB
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProduct);

    // Call the function to update the product in Stripe
    syncUpdateProductWithStripe(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json("Internal Server Error");
  }
}

// Delete a product from MongoDB and archived the product in Stripe
async function deleteProduct(req, res) {
  try {
    //Product to delete
    const productId = req.params.id;

    //Check if product exists
    const existingProduct = await ProductModel.findById(productId);

    if (!existingProduct) {
      throw new Error("No product found.");
    }

    //Archive product in Stripe
    await stripe.products.update(existingProduct.stripeProductId, {
      active: false,
    });
    console.log("The product is successfully archived in Stripe");

    // Delete from MongoDB
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json(null);

    return existingProduct;
  } catch (error) {
    console.error("Error occurred - can't delete product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
