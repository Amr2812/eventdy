const User = require("../models/User");

module.exports.getUserProfile = (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      res.send({
        email: user.email,
        username: user.username,
        image_url: user.image_url,
        bio: user.bio,
        date: user.date,
        events_created: user.events_created,
        events_attended: user.events_attended
      });
    })
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.getProfile = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.send({
        email: user.email,
        username: user.username,
        image_url: user.image_url,
        bio: user.bio,
        date: user.date,
        events_created: user.events_created,
        events_attended: user.events_attended
      });
    })
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    .then(doc => res.send(doc))
    .catch(err => res.status(404).send("User not found!"));
};
