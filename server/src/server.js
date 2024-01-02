require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");

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
