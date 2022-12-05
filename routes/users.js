const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const usersController = require("../controllers/users");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//USER Routes - simplified for now

router.get("/:id", ensureAuth, usersController.getProfile);

module.exports = router;
