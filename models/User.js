const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
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
  events_created: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  events_attended: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
