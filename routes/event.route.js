const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.route("/event").post(eventController.newEvent);

router.route("/event/:id").get(eventController.getEvent);

module.exports = router;
