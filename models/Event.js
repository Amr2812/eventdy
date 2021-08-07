const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Event Details:
 *      type: object
 *      required:
 *        - title
 *        - about
 *        - excerpt
 *        - location
 *        - date
 *        - endingDate
 *        - category
 *      properties: 
 *        _id:
 *          type: objectId 
 *        title:
 *          type: string
 *        about:
 *          type: string
 *        excerpt:
 *          type: string
 *        location:
 *          type: string
 *        date:
 *          type: string
 *        endingDate:
 *          type: string
 *        category:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Event Details (with organizer):
 *      type: object
 *      required:
 *        - title
 *        - about
 *        - excerpt
 *        - location
 *        - date
 *        - endingDate
 *        - category
 *        - organizer
 *      properties: 
 *        _id:
 *          type: objectId
 *        title:
 *          type: string
 *        about:
 *          type: string
 *        excerpt:
 *          type: string
 *        location:
 *          type: string
 *        date:
 *          type: string
 *        endingDate:
 *          type: string
 *        category:
 *          type: string
 *        organizer:
 *          $ref: "#/components/schemas/miniUser"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Event:
 *      type: object
 *      required:
 *        - title
 *        - about
 *        - excerpt
 *        - location
 *        - date
 *        - endingDate
 *        - category
 *      properties: 
 *        _id:
 *          type: objectId 
 *        title:
 *          type: string
 *        about:
 *          type: string
 *        excerpt:
 *          type: string
 *        location:
 *          type: string
 *        date:
 *          type: string
 *        endingDate:
 *          type: string
 *        category:
 *          type: string
 *        organizer:
 *          $ref: "#/components/schemas/miniUser"
 *        attenders:
 *          type: array
 *          items:
 *            $ref: "#/components/schemas/miniUser"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    miniEvent:
 *      type: object
 *      properties:
 *        _id:
 *          type: objectId
 *        title:
 *          type: string
 *        excerpt:
 *          type: string
 */

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  about: {
    type: String
  },
  excerpt: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date
  },
  endingDate: {
    type: Date
  },
  category: {
    type: String
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attenders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
