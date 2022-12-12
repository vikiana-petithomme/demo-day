const Comments = require("../models/Comments");

module.exports = {

  createComment: async (req, res) => {
    console.log('working')
    try {
     Comments.create({
        text: req.body.text,
        likes: 0,
        user: req.user.id,
        commentFor: req.params.id

      });
      console.log("Comment has been added!");
      var myHeaders = new Headers();
      myHeaders.append("Api-Key", "9c28a667d4b499b4305140da127b26603b9ceecc40ff078bcbbca80a84ba8db9");
      myHeaders.append("Api-Username", "system");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(`https://concur.discourse.group/posts.json?raw=${req.body.commentText}?embed_url=`, requestOptions)
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
  likeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comments = await Comments.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(comments.cloudinaryId);
      // Delete post from db
      await Comments.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
