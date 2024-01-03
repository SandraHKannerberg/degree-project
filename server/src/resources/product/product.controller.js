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

  console.log("Productlist: ", products);
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

// Add a new product
async function addProduct(req, res, next) {
  try {
    console.log("Incoming JSON:", req.body);
    const product = new ProductModel(req.body);

    let stripeProduct;

    // Create product in Stripe
    try {
      stripeProduct = await createProductInStripe(product);
    } catch (stripeError) {
      throw new Error(
        `Failed to create product in Stripe: ${stripeError.message}`
      );
    }

    // Sync with Stripe and save Stripe ID in MongoDB
    product.stripeProductId = stripeProduct.id;

    // Save product in MongoDB
    await product.save();

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
    syncUpdateProductWithStripe(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json("Internal Server Error");
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    const productToDelete = await ProductModel.findById({ _id: req.params.id });

    // Check if product exists and have a Stripe Id
    if (productToDelete && productToDelete.stripeProductId) {
      // Delete from Stripe
      await stripe.products.del(productToDelete.stripeProductId);
      console.log(
        `Product with ID ${productToDelete._id} is successfully deleted from Stripe.`
      );
    }

    // Delete from MongoDB
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json(null);

    console.log(
      `Product with ID ${req.params.id} is successfully deleted from the database.`
    );
  } catch (error) {
    console.error("Error occurred with Stripe:", error.message);
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
