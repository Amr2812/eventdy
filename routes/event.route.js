const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

const { requireAuth } = require("../middleware/auth");

router.post("/event", requireAuth, eventController.newEvent);

router.get("/event/:id", eventController.getEvent);

router.patch("/event/:id", eventController.updateEvent);

module.exports = router;
