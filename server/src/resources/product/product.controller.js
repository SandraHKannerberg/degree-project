const { ProductModel } = require("./product.model");

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

module.exports = {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
