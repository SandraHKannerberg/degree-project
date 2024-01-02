const { ProductModel } = require("./product.model");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

// *********** STRIPE FUNCTIONS *********** //

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

    // // Create the price in Stripe
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
  createProductInStripe,
};
