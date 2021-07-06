const mongoose = require("mongoose");

const miniEventSchema = mongoose.Schema({
  title: {
    type: String
  },
  about: {
    type: String
  }
});

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
  events_created: [miniEventSchema],
  events_attended: [miniEventSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
