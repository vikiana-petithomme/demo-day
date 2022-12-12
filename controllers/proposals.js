const cloudinary = require("../middleware/cloudinary");
const Proposals = require("../models/proposals");
const Category = require("../models/category");
const Users = require("../models/User");
const Comments = require("../models/Comments");



module.exports = {
  getProposals: async (req, res) => {
    try {
      const category = await Category.find();
      console.log(category)
      const proposals = await Proposals.find().sort({ createdAt: "desc" }).lean();
      console.log(proposals)
      res.render("home.ejs", { proposals: proposals, user: req.user,  category: category});

    } catch (err) {
      console.log(err);
    }
  },
  getFullProposal: async (req, res) => {
    try {
      const proposal = await Proposals.findById(req.params.id);
      console.log(proposal)
      
      await Users.findById(proposal.author, function(err, author){
        if (err) {
        req.flash('error', 'FIX IT!')
        res.redirect('/')
        } 
          res.render("fullProposal.ejs", { proposal: proposal, user:req.user,author: author});
        });
    } catch (err) {
      console.log(err);
    }
  },
  createProposal: async (req, res) => {
    console.log('you got here')
    try {
      

      console.log('this is what im looking for ' + "body: %j", req.files)

      const result = await cloudinary.uploader.upload(req.files.propIMG[0].path.toString())

      /*for (const [key, value] of Object.entries(input)) {
        console.log(key, value);
      }*/

      let materials = []
      for (let i=0; i < req.files.additionalMaterials.length; i ++){
        const result2 = await cloudinary.uploader.upload(req.files.additionalMaterials[i].path, {
          folder: 'Supplementary Proposal Material'
        })

        materials.push({
          public_id: result2.public_id,
          url: result2.secure_url,
          fileType: result2.format,
          resourceType: result2.resource_type
        })
      }

      /*for(let i=0; i<req.files.length; i++){ 
        materials = req.files[i].filename; 
      } */      
      await Proposals.create({
        name: req.body.proposalName,
        image: result.secure_url,
        cost: req.body.cost,
        impact: req.body.impact,
        stakeholders: req.body.partners,
        category: req.body.category,
        blurb: req.body.blurb,
        description:req.body.description,
        additionalMaterials:materials,
        imgCloudinaryId: result.public_id,
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
      fetch(`https://concur.discourse.group/posts.json?title=${req.body.proposalName}&raw=${req.body.blurb}&category=4`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          res.redirect("/home");
        })
        .catch(error => console.log('error', error));
    } catch (err) {
      
      console.log(err);
    }
  },
  likeProposal: async (req, res) => {
    try {
      await Proposals.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect('/home');
    } catch (err) {
      console.log(err);
    }
  },
  deleteProposal: async (req, res) => {
    try {
      // Find post by id
      let post = await Proposals.findById({ _id: req.params.id });
      // Delete post from db
      await Proposals.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/home");
    } catch (err) {
      res.redirect("/home");
    }
  },
};


/* createProposal: async (req, res) => {
    console.log('you got here')
    try {
      // Upload image to cloudinary
     /* const cloudinaryImageUploadMethod = async file => {
        return new Promise(resolve => {
            cloudinary.uploader.upload( file , (err, res) => {
              if (err) return res.status(500).send("upload image error")
                resolve({
                  res: res.secure_url
                }) 
              }
            ) 
        })
      }
          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const newPath = await cloudinaryImageUploadMethod(path);
            urls.push(newPath);
          }*/
         /* console.log('this is what im looking for '+ req.file.path)
          //console.log(req.files.additionalMaterials)
          const result = await cloudinary.uploader.upload(req.file.path)
          //const result2 = await cloudinary.uploader.upload(req.files.additionalMaterials.path)

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
      //  additionalMaterials: result2.secure_url,
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
  }, */