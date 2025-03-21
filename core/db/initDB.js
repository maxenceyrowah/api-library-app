const mongoose = require("mongoose");

// Connect to MongoDB

// version async/ await
const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// version promesse
// const initDB = () => {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((error) => console.error("Error connecting to MongoDB:", error));
// };

module.exports = initDB;
