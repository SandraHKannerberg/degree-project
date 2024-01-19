const { ProductModel } = require("./product.model");

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
    const newProduct = new ProductModel(req.body);

    // Save product in MongoDB
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    // next(err);
    console.log("Error occurred. Can't create a new product", error);
    return res.status(400).json("Error - Can't create a new product");
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

    // Delete from MongoDB
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json(null);

    return existingProduct;
  } catch (error) {
    console.error("Error occurred - can't delete product:", error);
    res.status(500).json("Internal Server Error");
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
