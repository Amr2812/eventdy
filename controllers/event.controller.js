const Event = require("../models/Event");
const User = require("../models/User");

module.exports.newEvent = async (req, res) => {
  const { title, about, location, date } = req.body;

  if (!(title && about && location && date)) {
    res.status(500).send("You have to fill all fields!");
    return;
  }

  try {
    const eventCheck = await Event.findOne({ title });
    if (eventCheck) {
      res.status(500).send("Event name already exist!");
      return;
    }

    const user = await User.findById(req.user.id);

    const event = new Event({
      title,
      about,
      location,
      date,
      organizer: user
    });

    const doc = await event.save();

    user.events_created.push(event);
    await user.save();

    res.send(doc);
  } catch (err) {
    res.send(err);
  }
};

module.exports.getEventDetails = (req, res) => {
  Event.findById(req.params.id, "-attenders")
    .then(event => res.send(event))
    .catch(err => res.send(err));
};

module.exports.getEventAttenders = (req, res) => {
  Event.findById(req.params.id, "attenders")
    .then(event => res.send(event))
    .catch(err => res.send(err));
};

module.exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.organizer._id != req.user.id) {
      res.status(401).send("Unauthorized to edit the event!");
      return;
    }

    const updatedEvent = await Event.findByIdAndUpdate(event._id, req.body, {
      new: true
    });

    res.send(updatedEvent);
  } catch (err) {
    res.status(404).send("Event not found!");
  }
};

module.exports.attendEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const event = await Event.findByIdAndUpdate(req.params.eventId, {
      $push: {
        attenders: {
          _id: user._id,
          image_url: user.image_url,
          username: user.username,
          bio: user.bio
        }
      }
    });

    user.events_attended.push(event);
    await user.save()

    res.send("success!")
  } catch (err) {
    res.send("Couldn't find Event!");
  }
};
