const mongoose = require("mongoose");

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
