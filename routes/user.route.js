const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router
  .route("/profile/:id")
  .get(userController.getProfile)
  .patch(userController.updateProfile);

module.exports = router;
