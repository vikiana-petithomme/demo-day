const cloudinary = require("../middleware/cloudinary");
const Users = require("../models/User");
const Category = require("../models/Tags");
const Proposals = require("../models/proposals");
var ObjectId = require("mongodb").ObjectID;

module.exports = {
  getProfile: async (req, res) => {
    try {
      const authoredproposals = await Proposals.find({ author: req.user.id });
      const likedProposals = await Proposals.find({
        supporters: ObjectId(req.user.id),
      });
      await Users.findById(req.params.id, function (err, foundUser) {
        if (err) {
          req.flash("error", "FIX IT!");
          res.redirect("/");
        }
        res.render("profileDashboard.ejs", {
          proposals: authoredproposals,
          likedProposals: likedProposals,
          user: foundUser,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicProfile: async (req, res) => {
    try {
      const authoredproposals = await Proposals.find({ author: req.user.id });

      await Users.findById(req.params.id, function (err, foundUser) {
        if (err) {
          req.flash("error", "FIX IT!");
          res.redirect("/");
        }
        res.render("publicProfile.ejs", {
          proposals: authoredproposals,
          user: foundUser,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateProfile: async (req, res) => {
    try {
      console.log(req.body);

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            location: req.body.location,
            website: req.body.website,
            bio: req.body.bio,
          },
        }
      );
      console.log("user profile updated" + req.user);
      res.redirect(`../${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  resetLocationDetails: async (req, res) => {
    console.log("made it to reset location conroller");
    try {
      if (
        req.body.location === "" ||
        req.body.location === null ||
        req.body.location === undefined
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $unset: { location: "" },
          }
        ).exec(function (err, result) {
          console.log("location reset for" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.website === "" ||
          req.body.website === null ||
          req.body.website === undefined
        ) &&
        !(
          req.body.bio === "" ||
          req.body.bio === null ||
          req.body.bio === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              website: req.body.website,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("location & website & bio updated" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.website === "" ||
          req.body.website === null ||
          req.body.website === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              website: req.body.website,
            },
          }
        ).exec(function (err, result) {
          console.log("location & website updated" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.bio === "" ||
          req.body.bio === null ||
          req.body.bio === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("location & bio updated" + req.user);
          res.redirect("back");
        });
      } else {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: { location: req.body.location },
          }
        ).exec(function (err, result) {
          console.log("location updated" + req.user);
          res.redirect("back");
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  resetSharedSiteDetails: async (req, res) => {
    console.log("made it to reset website conroller");
    try {
      if (
        req.body.website === "" ||
        req.body.website === null ||
        req.body.website === undefined
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $unset: { website: "" },
          }
        ).exec(function (err, result) {
          console.log("user profile updated" + req.user);
          req.history.back();
          res.redirect(`../${req.user.id}`);
        });
      } else if (
        !(
          req.body.location === "" ||
          req.body.location === null ||
          req.body.location === undefined
        ) &&
        !(
          req.body.bio === "" ||
          req.body.bio === null ||
          req.body.bio === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              website: req.body.website,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("location & bio also updated" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.location === "" ||
          req.body.location === null ||
          req.body.location === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              website: req.body.website,
            },
          }
        ).exec(function (err, result) {
          console.log("location also updated" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.bio === "" ||
          req.body.bio === null ||
          req.body.bio === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              website: req.body.website,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("bio also updated" + req.user);
          res.redirect("back");
        });
      } else {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: { website: req.body.website },
          }
        ).exec(function (err, result) {
          console.log("user profile updated" + req.user);
          res.redirect(`back`);
          // res.redirect(`../${req.user.id}`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  resetUserBio: async (req, res) => {
    console.log("made it to reset bio conroller");
    try {
      if (
        req.body.bio === "" ||
        req.body.bio === null ||
        req.body.bio === undefined
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $unset: { bio: "" },
          }
        ).exec(function (err, result) {
          console.log("user profile reset" + req.user);
          res.redirect(`back`);
        });
      } else if (
        !(
          req.body.location === "" ||
          req.body.location === null ||
          req.body.location === undefined
        ) &&
        !(
          req.body.website === "" ||
          req.body.website === null ||
          req.body.website === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              website: req.body.website,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("location & website & bio updated" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.location === "" ||
          req.body.location === null ||
          req.body.location === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              location: req.body.location,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("location & bio updated" + req.user);
          res.redirect("back");
        });
      } else if (
        !(
          req.body.website === "" ||
          req.body.website === null ||
          req.body.website === undefined
        )
      ) {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              website: req.body.website,
              bio: req.body.bio,
            },
          }
        ).exec(function (err, result) {
          console.log("website & bio updated" + req.user);
          res.redirect("back");
        });
      } else {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: { bio: req.body.bio },
          }
        ).exec(function (err, result) {
          console.log("user profile updated" + req.user);
          res.redirect(`back`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  changeAvatar: async (req, res) => {
    try {
      console.log(req.body.avatar);
      console.log(req.files);

      result = await cloudinary.uploader.upload(req.file.path);
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          avatar: result.secure_url,
        }
      );
      console.log("user profile updated" + req.user);
      res.redirect(`back`);
      // res.redirect(`../${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  newPassword: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          password: result.newPassword,
        }
      );
      console.log("user profile updated" + req.user);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
};
