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
}

