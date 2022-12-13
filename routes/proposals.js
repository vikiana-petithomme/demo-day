const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const proposalController = require("../controllers/proposals");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

 
//Post Routes - simplified for now
router.get("/:id", ensureAuth, proposalController.getFullProposal);

router.post("/createProposal", upload.fields([
       {name:'propIMG',maxCount:1},
       {name: 'additionalMaterials', maxCount:5},
    ]), proposalController.createProposal);

router.put("/likeProposal/:id", proposalController.likeProposal);   

router.delete("/deleteProposal/:id", proposalController.deleteProposal);

module.exports = router;