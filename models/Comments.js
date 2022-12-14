const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  commentFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal"
  }
});

module.exports = mongoose.model("Comment", CommentSchema);