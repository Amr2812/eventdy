const mongoose = require("mongoose");

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
 *        about:
 *          type: string
 */

const miniEventSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  title: {
    type: String
  },
  about: {
    type: String
  }
});

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
 *          type: date
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
 *          type: date
 *        eventsCreated:
 *          type: array
 *          items: 
 *            $ref: "#/components/schemas/miniEvent"
 *        eventsAttended:
 *          type: array
 *          items: 
 *            $ref: "#/components/schemas/miniEvent"
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
  eventsCreated: [miniEventSchema],
  eventsAttended: [miniEventSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
