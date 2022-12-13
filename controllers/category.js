const Category = require("../models/Tags");

module.exports = {
    newCategory: async (req, res) => {
        console.log('working')
        try {
         Category.create({
            name: req.body.newCategory
          });
          console.log("Comment has been added!");
        } catch (err) {
          console.log(err);
        }
      },
}
