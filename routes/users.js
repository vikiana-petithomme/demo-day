const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const usersController = require("../controllers/users");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//USER Routes - simplified for now

router.get("/:id", ensureAuth, usersController.getProfile);
router.get("public/:id", ensureAuth, usersController.getPublicProfile);
router.put("/updateUser/:id", ensureAuth, usersController.updateProfile);
router.put("/updateUser/resetLocation/:id", ensureAuth, usersController.resetLocationDetails);
router.put("/updateUser/resetUserBio/:id", ensureAuth, usersController.resetUserBio);
router.put("/updateUser/resetSharedSite/:id", ensureAuth, usersController.resetSharedSiteDetails);
router.put("/changeAvatar/:id",  upload.single("avatar"), ensureAuth, usersController.changeAvatar);
router.put("newPassword/:id", ensureAuth, usersController.newPassword);


module.exports = router;
