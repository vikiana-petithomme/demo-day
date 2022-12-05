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
      res.redirect(`/post/${req.params.id}`);
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
