const User = require("../models/User");

module.exports.getUserProfile = (req, res) => {
  User.findById(req.user.id, "-password")
    .then(user => res.send(user))
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.getProfile = (req, res) => {
  User.findById(req.params.id, "-password")
    .then(user => res.send(user))
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    .then(doc => res.send(doc))
    .catch(err => res.status(404).send("User not found!"));
};
