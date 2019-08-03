const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  // equivalent to createTable in sqlite
  name: String,
  age: Number
});

module.exports = mongoose.model("Author", authorSchema);
