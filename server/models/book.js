const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // equivalent to createTable in sqlite
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model("Book", bookSchema);
