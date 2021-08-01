const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const { requireAuth } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *  name: Events
 *  description: Every thing related to events
 */

/**
 * @swagger
 * /event:
 *  post:
 *    summary: Create a new event
 *    tags: [Events]
 *    requestBody:
 *      description: Event Details
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Event Details"
 *    responses:
 *      200:
 *        description: Returns Event Details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Event"
 *      500:
 *        description: Returns "Event name already exists!"
 */

router.post("/event", requireAuth, eventController.newEvent);

/**
 * @swagger
 * /events:
 *  get:
 *    summary: Get list of events searched, filtered & paginated (20 events each page)
 *    tags: [Events]
 *    parameters:
 *      - in: query
 *        name: search
 *        type: string
 *        description: Search Text
 *      - in: query
 *        name: category
 *        type: array
 *        description: List of categories or a single category
 *      - in: query
 *        name: page
 *        type: string
 *        description: Number of page
 *    responses:
 *      200:
 *        description: Returns 20 Events
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: "#/components/schemas/Event Details"
 *      404:
 *        description: Returns "No Events match this query!"
 */

router.get("/events", eventController.getEvents);

/**
 * @swagger
 * /event/{id}:
 *  get:
 *    summary: Get Event Details
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *          required: true
 *          description: Requested Event's Id
 *    responses: 
 *      200:
 *        description: Returns Event Details
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: "#/components/schemas/Event Details (with organizer)"
 *      404:
 *        description: Returns "Event not found!"
 */

router.get("/event/:id", eventController.getEventDetails);

/**
 * @swagger
 * /event-attenders/{id}:
 *  get:
 *    summary: Get Event Attenders
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *          required: true
 *          description: Requested Event's Id
 *    responses:
 *      200:
 *        description: Returns Event Attenders
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                attenders:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/miniUser"
 *      404:
 *        description: Returns "Event not found!"
 */

router.get("/event-attenders/:id", eventController.getEventAttenders);

/**
 * @swagger
 * /event/{id}:
 *  patch:
 *    summary: Update Event Details
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *          required: true
 *          description: Event's Id
 *    responses:
 *      200:
 *        description: Returns updated Event
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Event Details (with organizer)"
 *      401:
 *        description: Returns "Unauthorized!" or "Unauthorized to edit the event!"
 *      404:
 *        description: Returns "Event not found!"
 */

router.patch("/event/:id", requireAuth, eventController.updateEvent);

/**
 * @swagger
 * /attend/{eventId}:
 *  post:
 *    summary: Attend Event
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: eventId
 *        schema: 
 *          type: string
 *          required: true
 *          description: Event's Id
 *    responses: 
 *      200:
 *        description: Returns "OK"
 *      401:
 *        description: Returns "Unauthorized!"
 *      404:
 *        description: Returns "Event not find!"
 */

router.post("/attend/:eventId", requireAuth, eventController.attendEvent);

module.exports = router;
