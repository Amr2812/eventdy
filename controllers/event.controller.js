const Event = require("../models/Event");
const User = require("../models/User");

module.exports.newEvent = async (req, res) => {
  const { title, about, location, date, endingDate, category } = req.body;

  if (!(title && about && location && date && endingDate && category)) {
    res.status(500).send("You have to fill all fields!");
    return;
  }

  try {
    const eventCheck = await Event.findOne({ title }, { _id: 1 });
    if (eventCheck) {
      res.status(500).send("Event name already exist!");
      return;
    }

    const user = await User.findById(req.user.id, {
      eventsCreated: 0,
      eventsAttended: 0,
      password: 0
    });

    const event = new Event({
      title,
      about,
      location,
      date,
      endingDate,
      category,
      organizer: user
    });

    const doc = await event.save();

    user.eventsCreated.push(event);
    await user.save();

    res.send(doc);
  } catch (err) {
    res.send(err);
  }
};

module.exports.getEvents = (req, res) => {
  const { search, categories } = req.query;
  let { page } = req.query;

  if (!page) page = 1;

  const query = [
    {
      $match: {}
    },
    {
      $sort: {
        date: 1
      }
    },
    {
      $skip: page > 1 ? page * 20 : 0
    },
    {
      $limit: 20
    },
    {
      $project: {
        attenders: 0
      }
    }
  ];

  if (categories && categories.length > 1) {
    query[0].$match.category = {
      $in: categories
    };
  }

  if (search) {
    query[0].$match.$text = {
      $search: search
    };

    query[1].$sort.score = {
      $meta: "textScore"
    };
  }

  Event.aggregate(query)
    .then(events => res.send(events))
    .catch(err => res.status(500).send(err));
};

module.exports.getEventDetails = (req, res) => {
  Event.findById(req.params.id, { attenders: 0 })
    .then(event => res.send(event))
    .catch(err => res.send(err));
};

module.exports.getEventAttenders = (req, res) => {
  Event.findById(req.params.id, { attenders: 1 })
    .then(event => res.send(event))
    .catch(err => res.send(err));
};

module.exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, { organizer: 1 });

    if (event.organizer._id != req.user.id) {
      res.status(401).send("Unauthorized to edit the event!");
      return;
    }

    await Event.findByIdAndUpdate(event._id, req.body);

    res.send("Event Updated");
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

    user.eventsAttended.push(event);
    await user.save();

    res.send("success!");
  } catch (err) {
    res.status(404).send("Couldn't find Event!");
  }
};
