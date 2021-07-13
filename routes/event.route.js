const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

const { requireAuth } = require("../middleware/auth");

router.post("/event", requireAuth, eventController.newEvent);

router.get("/event/:id", eventController.getEventDetails);

router.get("/event-attenders/:id", eventController.getEventAttenders);

router.patch("/event/:id", eventController.updateEvent);

router.post("/attend/:eventId", requireAuth, eventController.attendEvent);

module.exports = router;
