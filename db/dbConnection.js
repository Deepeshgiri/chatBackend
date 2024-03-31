const mongoose = require("mongoose");

const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_URL);
    console.log("connected to db");
  } catch (error) {
    console.log("Error connecting to db ", error);
  }
};

module.exports = connectDB;
