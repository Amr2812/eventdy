const Event = require("../models/Event");
const User = require("../models/User");

module.exports.newEvent = async (req, res) => {
  const { organizer_id, title, about, location, date } = req.body;

  if (!(organizer_id && title && about && location && date)) {
    res.json({ msg: "You have to fill all fields!" });
    return;
  }

  try {
    const eventCheck = await Event.findOne({ title });
    if (eventCheck) {
      res.json({ msg: "Event name already exist!" });
      return;
    }

    const user = await User.findById(organizer_id);

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

    res.json(doc);
  } catch (err) {
    res.send(err);
  }
};

module.exports.getEvent = (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.send(err));
};
