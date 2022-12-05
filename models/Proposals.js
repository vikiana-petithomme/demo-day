const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  impact: {
    type: String,
    required: true,
  },
  additionalMaterials: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  blurb: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type:String,
    required:true,
  },
  stakeholders: {
    type:String,
    required:true,
  },
  cost: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Proposal", ProposalSchema);
