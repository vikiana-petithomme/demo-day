const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const proposalController = require("../controllers/proposals");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { check } = require("express-validator");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/home", ensureAuth, proposalController.getProposals);
router.get("/home/top", ensureAuth, proposalController.getTopProposals);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);

//Password RESET
router.post(
  "/recover",
  [check("email").isEmail().withMessage("Enter a valid email address")],
  authController.recover
);

router.get("/reset/:token", authController.reset);

router.post(
  "/reset/:token",
  [
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 chars long"),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  authController.resetPassword
);

module.exports = router;
