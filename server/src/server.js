require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");
const {
  syncProductListWithStripe,
} = require("../src/resources/product/product.stripe");

const PORT = process.env.PORT;
const databaseURL = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));

//Connect to server and database
async function main() {
  console.log("Connect to DB & start server");
  mongoose.set("strictQuery", true);
  await mongoose.connect(databaseURL);
  app.listen(PORT || 3001, () =>
    console.log(`Server is up and running on http://localhost:${PORT}`)
  );
}

// I ONLY NEEDED TO CALL THIS FUNCTION ONCE WHEN EXISTING DATABASE FROM MONGODB WAS SYNCHRONIZED WITH STRIPE.
// THEREFORE IT IS NOW COMMENTED OUT
// syncProductListWithStripe()
//   .then(() => {
//     console.log("Synchronization completed successfully.");
//   })
//   .catch((error) => {
//     console.error("Error during synchronization:", error);
//   });
