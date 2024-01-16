const { ProductModel } = require("./product.model");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

// *********** STRIPE FUNCTIONS *********** //

// Sync Productlist from database MongoDB with Stripe
// I called on it once in server.js to add existing products in database to Stripe for the first time
// or if products manually adds in MongoDB and not through restAPI for products
async function syncProductListWithStripe() {
  try {
    // Get data from MongoDB
    const productDataFromMongoDB = await ProductModel.find({ deleted: false });

    // Loop through every product and check if they exist in Stripe
    for (const product of productDataFromMongoDB) {
      // Check if both stripeProductId and stripePriceId exists
      if (product.stripeProductId && product.stripePriceId) {
        console.log(
          `Product ${product.title} already synced in Stripe. Skipping.`
        );
        continue; // Continue to next product if this already are synced to Stripe
      }

      // Get existing product in Stripe based on stripeProductId
      let existingProductInStripe;
      try {
        existingProductInStripe = await stripe.products.retrieve(
          product.stripeProductId
        );
      } catch (error) {
        console.log("Error occured to retrieve product from Stripe", err);
      }

      // Check if the product exists in Stripe
      if (existingProductInStripe) {
        // Product exist
        console.log(
          `Product ${product.title} already exists in Stripe. Skipping.`
        );
      } else {
        // If the product not exists - create a new Stripe Product
        try {
          const productToStripe = await stripe.products.create({
            name: product.title,
            images: [product.image],
            metadata: { mongoDBId: product._id.toString() },
          });

          console.log(
            `Successfully created product in Stripe: ${product.title}`
          );

          // Create price in Stripe and associate it with the product
          try {
            const priceToStripe = await stripe.prices.create({
              product: productToStripe.id,
              unit_amount: product.price * 100,
              currency: "SEK",
            });

            console.log(
              "Successfully created price in Stripe: ",
              priceToStripe
            );

            // Update MongoDB product with Stripe ID and Price ID
            const updatedProduct = await ProductModel.findByIdAndUpdate(
              product._id,
              {
                stripeProductId: productToStripe.id,
                stripePriceId: priceToStripe.id,
              },
              { new: true }
            );

            console.log(
              `${updatedProduct}: Updated MongoDB product with Stripe ID: ${productToStripe.id} and Price ID: ${priceToStripe.id}`
            );
          } catch (error) {
            console.error("Error creating price in Stripe:", error);
          }
        } catch (error) {
          console.error("Error creating product in Stripe:", error);
        }
      }
    }

    console.log("Sync completed successfully.");
  } catch (error) {
    console.error("Error retrieving data from MongoDB or Stripe:", error);
  }
}

// syncProductListWithStripe();

// Create a product in Stripe and update MongoDB database with Stripe ID
// Call this function inside createProduct in product.controller.js
async function createProductInStripe(product) {
  try {
    // Create the product in Stripe with data from MongoDB-databse
    const stripeProduct = await stripe.products.create({
      name: product.title,
      images: [product.image],
      metadata: {
        mongoDBId: product._id.toString(),
      },
    });

    // Create the price in Stripe
    const price = await stripe.prices.create({
      unit_amount: product.price * 100,
      currency: "SEK",
      product: stripeProduct.id,
    });

    // Update products in MongoDB with StripeProductId and StripePriceId
    await ProductModel.updateOne(
      { _id: product._id },
      { $set: { stripeId: stripeProduct.id, priceId: price.id } }
    );

    return stripeProduct;
  } catch (error) {
    console.error("Error occurred - can't sync product with Stripe:", error);
    throw error;
  }
}

// Sync updateProduct to the productinformation in Stripe IF STRIPE PRICE IS AN OWN UNIT
async function syncUpdateProductWithStripe(product) {
  try {
    // Fetch prices from Stripe (related to the product to be updated)
    const prices = await stripe.prices.list({
      product: product.stripeProductId,
    });

    // Does the price exists?
    const existingPrice = prices.data.length > 0 ? prices.data[0] : null;

    // Has the price changed?
    const isPriceChanged =
      existingPrice &&
      calculateUnitAmount(product.price) !== existingPrice.unit_amount;

    // If change - inactive the old price
    if (isPriceChanged) {
      for (const price of prices.data) {
        await stripe.prices.update(price.id, {
          active: false,
        });
        console.log(`Price ${price.id} is inactive in Stripe`);
      }

      // Create a new price for the product in Stripe
      const newPrice = await stripe.prices.create({
        product: product.stripeProductId,
        unit_amount: calculateUnitAmount(product.price),
        currency: "SEK",
        active: true,
      });

      console.log("New price created in Stripe:", newPrice);

      // Update stripePriceId in MongoDB with the new price id
      await ProductModel.updateOne(
        { _id: product._id },
        { $set: { stripePriceId: newPrice.id } }
      );

      console.log(`stripePriceId updated in MongoDB: ${newPrice.id}`);
    }

    // Perform the update in Stripe
    const updatedStripeProduct = await stripe.products.update(
      product.stripeProductId,
      {
        name: product.title,
        images: [product.image],
        metadata: {
          mongoDBId: product._id.toString(),
        },
      }
    );

    console.log("Product updated in Stripe:", updatedStripeProduct);
  } catch (error) {
    console.error("Error updating product in Stripe:", error);
    throw error;
  }
}

function calculateUnitAmount(price) {
  return price * 100;
}

module.exports = {
  createProductInStripe,
  syncUpdateProductWithStripe,
  syncProductListWithStripe,
};
