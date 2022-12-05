const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const communitiesController = require("../controllers/communities");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get("/", ensureAuth, communitiesController.getCommunities);

router.get("/:id", ensureAuth, communitiesController.getCommunity);

router.post("/createCommunity", communitiesController.createCommunity);

router.put("/joinCommunity/:id", communitiesController.joinCommunity);   

router.delete("/deleteCommunity/:id", communitiesController.deleteCommunity);

module.exports = router;
