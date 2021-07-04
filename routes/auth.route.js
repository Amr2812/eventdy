const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router
  .route("/login")
  .post(authController.login);

router
  .route("/signup")
  .post(authController.signup);

router.get("/logout", authController.logout);

module.exports = router;
