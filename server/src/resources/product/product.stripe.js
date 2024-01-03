const { ProductModel } = require("./product.model");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

// *********** STRIPE FUNCTIONS *********** //

// const DEFAULT_CURRENCY = "SEK";

// Sync Productlist from database MongoDB with Stripe
// Runs once in server.js to add existing products in database to Stripe for the first time
// or if products manually adds in MongoDB and not through restAPI for products
async function syncProductListWithStripe() {
  try {
    // Get data from MongoDB
    const productDataFromMongoDB = await ProductModel.find({ deleted: false });

    // Loop through every product and create products/prices in Stripe
    for (const product of productDataFromMongoDB) {
      try {
        // Create product in Stripe
        const productToStripe = await stripe.products.create({
          name: product.title,
          description: product.description,
          images: [product.image],
          metadata: { mongoDBId: product._id.toString() }, // ADD PRICE AND CURRENCY AS METADATA??????????
        });

        console.log(`Successfully created product in Stripe: ${product.title}`);

        // Create price in Stripe and associate it with the product
        try {
          const priceToStripe = await stripe.prices.create({
            product: productToStripe.id,
            unit_amount: product.price * 100,
            currency: "SEK",
          });

          console.log("Successfully created price in Stripe: ", priceToStripe);
        } catch (error) {
          console.error("Error creating price in Stripe:", error);
        }

        // Update MongoDB product with Stripe ID
        await ProductModel.findByIdAndUpdate(
          product._id,
          { stripeProductId: productToStripe.id },
          { new: true }
        );

        console.log(
          `Updated MongoDB product with Stripe ID: ${productToStripe.id}`
        );
      } catch (error) {
        console.error("Error creating product or price in Stripe:", error);
      }
    }

    console.log("Sync completed successfully.");
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
  }
}

// Create a product in Stripe and update MongoDB database with Stripe ID
async function createProductInStripe(product) {
  try {
    // Create the product in Stripe, price = metadata
    // const stripeProduct = await stripe.products.create({
    //   name: product.title,
    //   description: product.description,
    //   images: [product.image],
    //   metadata: {
    //     mongoDBId: product._id.toString(),
    //     price: product.price,
    //     currency: DEFAULT_CURRENCY,
    //   },
    // });

    // Create the product in Stripe and connect with the price
    const stripeProduct = await stripe.products.create({
      name: product.title,
      description: product.description,
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

    // Update the database with Stripe ID
    // await ProductModel.findByIdAndUpdate(product._id, {
    //   stripeProductId: price.product,
    // });

    // Update products in MongoDB with StripeID
    await ProductModel.updateOne(
      { _id: product._id },
      { $set: { stripeId: stripeProduct.id } }
    );

    return stripeProduct;
  } catch (error) {
    console.error("Error occurred - can't sync product with Stripe:", error);
    throw error;
  }
}

// Sync updateProduct with Stripe PRICE SEND AS METADATA
// async function syncUpdateProductWithStripe(product) {
//   try {
//     // Update product information in Stripe
//     const updatedStripeProduct = await stripe.products.update(
//       product.stripeProductId,
//       {
//         name: product.title,
//         description: product.description,
//         images: [product.image],
//         metadata: {
//           mongoDBId: product._id.toString(),
//           price: product.price,
//           currency: DEFAULT_CURRENCY,
//         },
//       }
//     );

//     console.log("Product updated in Stripe:", updatedStripeProduct);
//   } catch (error) {
//     console.error("Error updating product in Stripe:", error);
//     throw error;
//   }
// }

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
    }

    // Perform the update in Stripe
    const updatedStripeProduct = await stripe.products.update(
      product.stripeProductId,
      {
        name: product.title,
        description: product.description,
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
