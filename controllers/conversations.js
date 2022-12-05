const cloudinary = require("../middleware/cloudinary");
const Conversations = require("../models/Conversation");
const Community = require("../models/Community");


module.exports = {
  getConversation: async (req, res) => {
    try {
      const proposals = await Proposals.find({ user: req.user.id });
      res.render("profile.ejs", { proposals: proposals, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getConversations: async (req, res) => {
    try {
      // const community = await Community.findById(req.params.id);
      const conversations = await Conversations.find().sort({ createdAt: "desc" }).lean();
      res.render("roundtable.ejs", { conversations: conversations});
    } catch (err) {
      console.log(err);
    }
  },
  followConversation: async (req, res) => {
    try {
      const category = await Category.find();
      console.log(category)
      const proposals = await Proposals.find().sort({ createdAt: "desc" }).lean();
      console.log(proposals)
      res.render("profile.ejs", { proposals: proposals, user: req.user,  category: category});

    } catch (err) {
      console.log(err);
    }
  },
  createConversation: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await Proposals.create({
        name: req.body.proposalName,
        image: result.secure_url,
        cost: req.body.cost,
        impact: req.body.impact,
        stakeholders: req.body.partners,
        category: req.body.category,
        blurb: req.body.blurb,
        description: req.body.description,
        cloudinaryId: result.public_id,
        additionalMaterials: result.secure_url,
        likes: 0,
        author: req.user.id
      });
      console.log("Post has been added!");
      var myHeaders = new Headers();
      myHeaders.append("Api-Key", "9c28a667d4b499b4305140da127b26603b9ceecc40ff078bcbbca80a84ba8db9");
      myHeaders.append("Api-Username", "system");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      console.log( 'this is the proposal ID ' + proposal.id)

      fetch(`https://concur.discourse.group/users.json?title=${req.body.proposalName}&raw=${req.body.blurb}&category=4`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          res.redirect("/profile");
        })
        .catch(error => console.log('error', error));
    } catch (err) {
      console.log(err);
    }
  },
  deleteConversation: async (req, res) => {
    try {
      // Find post by id
      let post = await Proposals.findById({ _id: req.params.id });
      // Delete post from db
      await Proposals.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
