const mongoose = require("mongoose");
const { app } = require("./app");
const dotenv = require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  console.log("Connect to DB & start server");
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  app.listen(process.env.PORT || 3001, () =>
    console.log("Server is up and running on Localhost port:", process.env.PORT)
  );
}
