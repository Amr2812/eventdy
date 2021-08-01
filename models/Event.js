const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    miniUser:
 *      type: object
 *      required:
 *        - username
 *      properties: 
 *        _id:
 *          type: objectId
 *        image_url:
 *          type: string
 *        bio:
 *          type: string
 */

const miniUserSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  image_url: {
    type: String
  },
  username: {
    type: String
  },
  bio: {
    type: String
  }
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Event Details (with organizer):
 *      type: object
 *      required:
 *        - title
 *        - about
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
 *    Event Details:
 *      type: object
 *      required:
 *        - title
 *        - about
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
 *    Event:
 *      type: object
 *      required:
 *        - title
 *        - about
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

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  about: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
  },
  endingDate: {
    type: Date,
  },
  category: {
    type: String
  },
  organizer: miniUserSchema,
  attenders: [miniUserSchema]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
