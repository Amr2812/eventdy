const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - username
 *      properties:
 *        _id:
 *          type: objectId 
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        username:
 *          type: string
 *        image_url:
 *          type: string
 *        bio:
 *          type: string
 *        date:
 *          type: string
 *        eventsCreated:
 *          type: array
 *          items: 
 *            $ref: "#/components/schemas/miniEvent"
 *        eventsAttended:
 *          type: array
 *          items:
 *            $ref: "#/components/schemas/miniEvent"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User (Password Projected):
 *      type: object
 *      properties:
 *        _id:
 *          type: objectId 
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        image_url:
 *          type: string
 *        bio:
 *          type: string
 *        date:
 *          type: string
 *        eventsCreated:
 *          type: array
 *          items: 
 *            $ref: "#/components/schemas/miniEvent"
 *        eventsAttended:
 *          type: array
 *          items: 
 *            $ref: "#/components/schemas/miniEvent"
 */

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

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  username: {
    type: String
  },
  image_url: {
    type: String
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
