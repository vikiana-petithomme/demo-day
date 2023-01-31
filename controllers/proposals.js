const cloudinary = require("../middleware/cloudinary");
const Proposals = require("../models/proposals");
const Category = require("../models/Tags");
const Users = require("../models/User");
const Comments = require("../models/Comments");
var ObjectId = require("mongodb").ObjectID;

module.exports = {
  getProposals: async (req, res) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    let sort = req.query.sort || { createdAt: "desc" };
    let category = [req.query.category] || "All";
    const startIndex = page * limit - limit;
    const endIndex = page * limit;
    const categories = await Category.find();
    console.log("category to show " + category);

    if (category == "All") {
      category = categories;
    }
    console.log(category);

    if (req.query.sort) {
      sort = req.query.sort.split(",");
    } else {
      sort = [sort];
    }

    let sortBy = {};

    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    let result = {};
    if (endIndex < Proposals.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      let catName = [];
      console.log(category.length);

      if (category.length == 1) {
        catName.push(category[0]);
      } else {
        for (let i = 0; i < category.length; i++) {
          catName.push(category[i].name);
        }
      }

      const master = await Proposals.find({ published: true });
      const masterPaginated = await Proposals.find({ published: true })
        .sort(sortBy)
        .skip(endIndex)
        .limit(limit);
      /*
      let usedCategories = [];
      for (let i = 0; i < master.length; i++) {
        let cats = await Category.find({ name: master[i].category });

        if (usedCategories.indexOf(cats[i]) === -1) {
          usedCategories.push(cats[i]);
          console.log("all categories " + usedCategories);
        }
      }*/

      const proposals = await Proposals.find({ published: true })
        .where("category")
        .in([...catName]);

      console.log(proposals);

      result.proposals = await Proposals.find()
        .where("category")
        .in([...catName])
        .sort(sortBy)
        .skip(endIndex)
        .limit(limit);

      let total = await Proposals.countDocuments({
        published: true,
      })
        .where("category")
        .in([...catName]);

      if (result.proposals.length === 0) {
        result.proposals = masterPaginated;
        total = master.length;
      }

      let pages = total / limit;

      let authors = [];
      for (let i = 0; i < proposals.length; i++) {
        //console.log(proposals);
        let author = await Users.findById(proposals[i].author);

        if (authors.indexOf(author.id) === -1) {
          authors.push(author.id);
        }
      }

      if (proposals.length === 0) {
        for (let i = 0; i < master.length; i++) {
          //console.log(proposals);
          let author = await Users.findById(master[i].author);

          if (authors.indexOf(author.id) === -1) {
            authors.push(author.id);
          }
        }
      }
      res.render("home.ejs", {
        proposals: result.proposals,
        user: req.user,
        pagination: result,
        category: categories,
        master: master,
        //usedCats: usedCategories,
        authors: authors,
        total: total,
        pages: Math.ceil(pages),
        page: page + 1,
        limit: limit,
      });
      res.redirect("/home?category=All");
    } catch (err) {
      console.log(err);
    }
  },
  getTopProposals: async (req, res) => {
    try {
      const proposals = await Proposals.find().sort({ likes: -1 }).lean();
      const category = await Category.find();
      let authors = [];
      for (let i = 0; i < proposals.length; i++) {
        let author = await Users.findById(proposals[i].author);
        console.log("one user " + author);
        console.log(authors.indexOf(author) === -1);
        if (authors.indexOf(author.id) === -1) {
          authors.push(author.id);
          console.log("all authors " + authors);
        }
      }
      res.render("home.ejs", {
        proposals: proposals,
        user: req.user,
        category: category,
        authors: authors,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getFullProposal: async (req, res) => {
    try {
      const proposal = await Proposals.findById({ _id: req.params.id });
      console.log(proposal);
      const comments = await Comments.find({ commentFor: req.params.id });
      await Users.findById(proposal.author, function (err, author) {
        if (err) {
          req.flash("error", "FIX IT!");
          res.redirect("/");
        }
        res.render("fullProposal.ejs", {
          proposal: proposal,
          user: req.user,
          author: author,
          comments: comments,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  saveDraft: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(
        req.files.propIMG[0].path.toString()
      );

      let materials = [];
      for (let i = 0; i < req.files.additionalMaterials.length; i++) {
        const result2 = await cloudinary.uploader.upload(
          req.files.additionalMaterials[i].path,
          {
            folder: "Supplementary Proposal Material",
          }
        );

        materials.push({
          public_id: result2.public_id,
          url: result2.secure_url,
          fileType: result2.format,
          resourceType: result2.resource_type,
        });
      }
      Proposals.create(
        {
          name: req.body.proposalName,
          image: result.secure_url,
          cost: req.body.cost,
          impact: req.body.impact,
          stakeholders: req.body.partners,
          category: req.body.category,
          blurb: req.body.blurb,
          description: req.body.description,
          additionalMaterials: materials,
          imgCloudinaryId: result.public_id,
          likes: 0,
          supporters: [],
          author: req.user.id,
          published: false,
        },
        function (err, proposal) {
          if (err) {
            req.flash("error", "FIX IT!");
            res.redirect("/home");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  createProposal: async (req, res) => {
    console.log("you are trying to add a new proposal");
    try {
      const result = await cloudinary.uploader.upload(
        req.files.propIMG[0].path.toString()
      );

      let materials = [];
      for (let i = 0; i < req.files.additionalMaterials.length; i++) {
        const result2 = await cloudinary.uploader.upload(
          req.files.additionalMaterials[i].path,
          {
            folder: "Supplementary Proposal Material",
          }
        );

        materials.push({
          public_id: result2.public_id,
          url: result2.secure_url,
          fileType: result2.format,
          resourceType: result2.resource_type,
        });
      }

      /*for(let i=0; i<req.files.length; i++){ 
        materials = req.files[i].filename; 
      } */

      await Proposals.create(
        {
          name: req.body.proposalName,
          image: result.secure_url,
          cost: req.body.cost,
          impact: req.body.impact,
          stakeholders: req.body.partners,
          category: req.body.category.trim(),
          blurb: req.body.blurb,
          description: req.body.description,
          additionalMaterials: materials,
          imgCloudinaryId: result.public_id,
          likes: 0,
          supporters: [],
          author: req.user.id,
          published: true,
        },
        function (err, proposal) {
          if (err) {
            req.flash("error", "FIX IT!");
            res.redirect("/home");
          }
          console.log("you adding details of proposal");
          if (req.body.newCategory != null) {
            console.log(
              "this is a new categoy so we are adding it to the database"
            );
            Category.create(
              {
                name: req.body.newCategory,
                proposals: [{ proposal }],
              },
              function (err, category) {
                console.log("Post has been added!");
                var myHeaders = new Headers();
                myHeaders.append(
                  "Api-Key",
                  "9c28a667d4b499b4305140da127b26603b9ceecc40ff078bcbbca80a84ba8db9"
                );
                myHeaders.append("Api-Username", "system");

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  redirect: "follow",
                };
                fetch(
                  `https://concur.discourse.group/posts.json?title=${req.body.proposalName}&raw=${req.body.blurb}&category=4`,
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                    res.redirect("/home");
                  })
                  .catch((error) => console.log("error", error));
              }
            );
          } else {
            console.log("we are connecting this proposal to the category");
            Category.findOneAndUpdate(
              {
                name: req.body.category,
              },
              {
                $addToSet: { proposals: [{ proposal }] },
              },
              function (err, category) {
                if (err) {
                  req.flash("error", "FIX IT!");
                  res.redirect("/home");
                }
              }
            );
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  likeProposal: async (req, res) => {
    try {
      const proposal = await Proposals.findById({ _id: req.params.id });
      let supporters = proposal.supporters;
      let likes = proposal.likes;
      if (supporters.includes(ObjectId(req.user.id))) {
        console.log("user already liked. " + supporters);
        Proposals.updateOne(
          {
            _id: req.params.id,
          },
          {
            $inc: { likes: -1 },
            $unset: { supporters: [req.user.id] },
          },
          {
            multi: true,
          },
          function (err, category) {
            if (err) {
              req.flash("error", "FIX IT!");
              res.redirect("/");
              console.log(
                `user may have already liked. ${proposal.supporters.includes(
                  req.user.id
                )}`
              );
            }
          }
        );
      }
      if (!supporters.includes(ObjectId(req.user.id))) {
        Proposals.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: { likes: +1 },
            $addToSet: { supporters: [req.user.id] },
          },
          function (err, category) {
            if (err) {
              req.flash("error", "FIX IT!");
              res.redirect("/");
              console.log(
                `user may have already liked. ${proposal.supporters.includes(
                  req.user.id
                )}`
              );
            }
          }
        );
      }
      res.redirect(req.get("referer"));
    } catch (err) {
      console.log(err);
    }
  },
  deleteProposal: async (req, res) => {
    try {
      // Delete post from db
      await Proposals.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("back");
    } catch (err) {
      res.redirect(req.get("referer"));
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
