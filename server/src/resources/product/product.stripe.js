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

// Sync update with Stripe
async function updateProductInStripe(product, newPrice) {
  try {
    // Update productinformation Stripe
    const stripeProduct = await stripe.products.update(
      product.stripeProductId,
      {
        name: product.title,
        description: product.description,
        images: [product.image],
        metadata: { mongoDBId: product._id.toString() },
      }
    );

    // Update the price in Stripe if there is new price information
    if (newPrice) {
      let priceIdToUpdate = null;
      // Check if product have a price ID. If yes - update
      if (product.price && product.price.stripePriceId) {
        priceIdToUpdate = product.price.stripePriceId;
      } else {
        // If no - create a new price and connect to the product
        const price = await stripe.prices.create({
          unit_amount: newPrice * 100,
          currency: "sek",
          product: product.stripeProductId,
        });

        // Save price ID
        priceIdToUpdate = price.id;
        await product.save();
      }
    }

    console.log("Product updated in Stripe:", stripeProduct);
    return stripeProduct;
  } catch (error) {
    console.error("Error updating product in Stripe:", error);
    throw error;
  }
}

module.exports = {
  createProductInStripe,
  updateProductInStripe,
};
