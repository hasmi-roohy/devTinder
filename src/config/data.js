const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://HasmiRoohy:VEzaW67ZZ7HvcHZH@cluster0.zlhxa.mongodb.net/devTinder"
    );
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // rethrow to handle in main server file
  }
};

module.exports = connectDB;
