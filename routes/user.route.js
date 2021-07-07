const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const { requireAuth } = require("../middleware/auth");

router.get("/profile", requireAuth, userController.getUserProfile);
router.patch("/profile", requireAuth, userController.updateProfile);

router.get("/profile/:id", userController.getProfile);

module.exports = router;
