const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

const { requireAuth } = require("../middleware/auth");

router.post("/event", requireAuth, eventController.newEvent);

router.route("/event/:id").get(eventController.getEvent);

module.exports = router;
