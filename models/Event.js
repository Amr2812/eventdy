const mongoose = require("mongoose");

const miniUserSchema = mongoose.Schema({
  username: {
    type: String
  },
  image_url: {
    type: String
  },
  bio: {
    type: String
  }
});

const eventSchema = mongoose.Schema({
  organizer: miniUserSchema,
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
  attenders: [miniUserSchema]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
