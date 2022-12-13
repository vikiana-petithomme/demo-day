const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  proposals: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  }
});

module.exports = mongoose.model("tag", CategorySchema);
