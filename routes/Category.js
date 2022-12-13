const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes

router.post("/newCategory", categoryController.newCategory);

module.exports = router;
