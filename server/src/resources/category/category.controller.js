const { CategoryModel } = require("./category.model");

// *********** ENDPOINTS CATEGORIES *********** //

// GET all categories
async function getAllCategories(req, res) {
  const categories = await CategoryModel.find({});
  res.status(200).json(categories);
}

// GET a specific category by id
async function getCategory(req, res) {
  const category = await CategoryModel.findOne({
    _id: req.params.id,
  });
  res.status(200).json(category);
}

module.exports = {
  getAllCategories,
  getCategory,
};
