const { ProductModel } = require("./product.model");
const { createProductInStripe } = require("./product.controller");

async function syncExistingProducts() {
  try {
    // Get all existing products in MongoDB
    const existingProducts = await ProductModel.find({}).lean();

    // Loop through all existing products in MongoDB and create them in Stripe
    for (const product of existingProducts) {
      await createProductInStripe(product);
    }

    console.log("Sync products to Stripe successfull");
  } catch (error) {
    console.error("Error occurred when try to sync products to Stripe:", error);
  }
}

// Sync products to Stripe
syncExistingProducts();
