const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  mission: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    require: true,
  },
  conversations: {
    type: Array,
    require: false,
  },
});

module.exports = mongoose.model("Community", CommunitySchema);
