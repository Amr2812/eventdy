const User = require("../models/User");

module.exports.getProfile = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json({
        email: user.email,
        username: user.username,
        image_url: user.image_url,
        bio: user.bio,
        date: user.date,
        events_created: user.events_created,
        events_attended: user.events_attended
      });
    })
    .catch(err => res.send(err));
};
