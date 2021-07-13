const mongoose = require("mongoose");

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
  category: {
    type: String
  },
  attenders: [miniUserSchema]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
