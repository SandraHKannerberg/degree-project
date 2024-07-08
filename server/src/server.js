require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");

const PORT = 3000;
const databaseURL = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));

//Connect to server and database
async function main() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(databaseURL);
  console.log("DB Connection Successfull!");
  app.listen(PORT || 3001, () => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Server is up and running -- production mode');
    } else {
      console.log(`Server is up and running on http://localhost:${PORT}`);
    }
  });
  console.log('MODE: ', process.env.NODE_ENV);
}
