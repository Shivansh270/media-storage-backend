const mongoose = require("mongoose");

//loading all the contents of .env inside the process object
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connection is sucessful"))
    .catch((error) => {
      console.log("issue in db connection");
      console.error(error.message);
      process.exit(1);
    });
};
