const DB = require("./dbConfig");
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(DB.url)
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => {
    console.log("Something is wrong " + err);
    connectDB();
  });
}

module.exports = connectDB;