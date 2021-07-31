const User = require("../models/User");

module.exports.getUserProfile = (req, res) => {
  User.findById(req.user.id, { password: 0 })
    .then(user => res.send(user))
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.getProfile = (req, res) => {
  User.findById(req.params.id, { password: 0 })
    .then(user => res.send(user))
    .catch(err => res.status(404).send("User not found!"));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    .populate({ password: 0 })
    .then(doc => res.send(doc))
    .catch(err => res.status(404).send("User not found!"));
};
