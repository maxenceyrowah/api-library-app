const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  birthYear: { type: Number, required: true },
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
