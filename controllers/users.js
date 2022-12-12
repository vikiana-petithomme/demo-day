const cloudinary = require("../middleware/cloudinary");
const Users = require("../models/User");
const Category = require("../models/category");
const Proposals = require("../models/proposals");


module.exports = {
    
    getProfile: async (req, res) => {
        try {
        
          const authoredproposals = await Proposals.find({ author: req.user.id });
          
          await Users.findById(req.params.id, function(err, foundUser){ 
            if (err) {
                req.flash('error', 'FIX IT!')
                res.redirect('/')
            } 
            res.render('profileDashboard.ejs', { proposals: authoredproposals, user: foundUser});
          });
        } catch (err) {
          console.log(err);
        }
    },
    getPublicProfile: async (req, res) => {
      try {
      
        const authoredproposals = await Proposals.find({ author: req.user.id });
        
        await Users.findById(req.params.id, function(err, foundUser){ 
          if (err) {
              req.flash('error', 'FIX IT!')
              res.redirect('/')
          } 
          res.render('publicProfile.ejs', { proposals: authoredproposals, user: foundUser});
        });
      } catch (err) {
        console.log(err);
      }
  },
    updateProfile: async (req, res) => {
      try {
        
        console.log(req.body)
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {$set:{
            'DOB': req.body.DOB,
            'location': req.body.location,
            'website': req.body.website,
            'bio': req.body.bio,
          }
          }
        );
        console.log("user profile updated"  + req.user);
        res.redirect(`../${req.user.id}`);
      } catch (err) {
        console.log(err);
      }
  },
  resetLocationDetails: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {$unset:
          {
            location: true,
          }
        }
      ).exec(function(err, result){
          console.log("user profile updated"  + req.user);
          return result;
          res.redirect(`../${req.user.id}`);
      })
    } catch (err) {
      console.log(err);
    }
  },
resetSharedSiteDetails: async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {$unset:
        {
          'website': true,
        }
      }
    ).exec(function(err, result){
        console.log("user profile updated"  + req.user);
        return result;
        res.redirect(`../${req.user.id}`);
    })
  } catch (err) {
    console.log(err);
  }
  },
  resetUserBio: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {$unset:
          {
            'bio': true,
          }
        }
      ).exec(function(err, result){
          console.log("user profile updated"  + req.user);
          return result;
          res.redirect(`../${req.user.id}`);
      })
    } catch (err) {
      console.log(err);
    }
    },
  changeAvatar: async (req, res) => {
    try {
      console.log(req.body.avatar)
      console.log(req.files)
        
      result = await cloudinary.uploader.upload(req.file.path)
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
            'avatar': result.secure_url
        }
      );
      console.log("user profile updated"  + req.user);
      res.redirect(`../${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  newPassword: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
            'password': result.secure_url
        }
      );
      console.log("user profile updated"  + req.user);
      res.redirect(`../${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
}

