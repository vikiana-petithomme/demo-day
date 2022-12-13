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
    type: [{public_id: String, fileType:String, resourceType:String, url: String}],
    required: false,

  },
  imgCloudinaryId: {
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
  supporters: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

module.exports = mongoose.model("Proposal", ProposalSchema);
