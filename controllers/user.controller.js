const User = require("../models/User");

module.exports.getUserProfile = async (req, res) => {
  User.findById(id, { password: 0 })
    .populate({
      path: "eventsCreated",
      select: {
        title: 1,
        excerpt: 1
      }
    })
    .populate({
      path: "eventsAttended",
      select: {
        title: 1,
        excerpt: 1
      }
    })
    .then(user => res.send(user))
    .catch(err => res.status(404).send(err));
};

module.exports.getProfile = (req, res) => {
  User.findById(req.params.id, { password: 0 })
    .populate({
      path: "eventsCreated",
      select: {
        title: 1,
        excerpt: 1
      }
    })
    .populate({
      path: "eventsAttended",
      select: {
        title: 1,
        excerpt: 1
      }
    })
    .then(user => res.send(user))
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    .populate({
      path: "eventsCreated",
      select: {
        title: 1,
        excerpt: 1
      }
    })
    .populate({
      path: "eventsAttended",
      select: {
        title: 1,
        excerpt: 1
      }
    })
    .then(user => res.send(user))
    .catch(err => res.status(404).send("User not found!"));
};
