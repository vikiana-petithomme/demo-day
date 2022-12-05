const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const conversationsController = require("../controllers/conversations");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get("/", ensureAuth, conversationsController.getConversations);

router.get("/:id", ensureAuth, conversationsController.getConversation);

router.post("/createConversation", conversationsController.createConversation);

router.put("/followConversation/:id", conversationsController.followConversation);   

router.delete("/deleteConversation/:id", conversationsController.deleteConversation);

module.exports = router;
