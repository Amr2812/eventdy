const Event = require("../models/Event");
const User = require("../models/User");

module.exports.newEvent = async (req, res) => {
  const { title, about, excerpt, location, date, endingDate, category } =
    req.body;

  if (
    !(title && about && excerpt && location && date && endingDate && category)
  ) {
    res.status(500).send("You have to fill all fields!");
    return;
  }

  if (excerpt.length > 300) {
    res.status(500).send("Excerpt maximium length is 300 characters!");
    return;
  }

  try {
    const eventCheck = await Event.findOne({ title }, { _id: 1 });
    if (eventCheck) {
      res.status(500).send("Event name already exists!");
      return;
    }

    const user = await User.findById(req.user.id, {
      eventsAttended: 0,
      password: 0
    });

    const event = new Event({
      title,
      about,
      excerpt,
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
  const { search, category } = req.query;
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
        attenders: 0,
        organizer: 0,
        about: 0
      }
    }
  ];

  if (category && category.length > 0) {
    if (typeof category === "object") {
      query[0].$match.category = {
        $in: category
      };
    } else {
      query[0].$match.category = category;
    }
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
    .then(events =>
      events.length > 0
        ? res.send(events)
        : res.status(404).send("No Events match this query!")
    )
    .catch(err => res.status(500).send(err));
};

module.exports.getEventDetails = (req, res) => {
  Event.findById(req.params.id, { attenders: 0 })
    .then(event => res.send(event))
    .catch(err => res.status(404).send("Event not found!"));
};

module.exports.getEventAttenders = (req, res) => {
  Event.findById(req.params.id, { attenders: 1 })
    .then(event => res.send(event))
    .catch(err => res.status(404).send("Event not found!"));
};

module.exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, { organizer: 1 });

    if (event.organizer._id != req.user.id) {
      res.status(401).send("Unauthorized to edit the event!");
      return;
    }

    const updatedEvent = await Event.findByIdAndUpdate(event._id, req.body);

    delete updatedEvent.attenders;
    res.send(updatedEvent);
  } catch (err) {
    res.status(404).send("Event not found!");
  }
};

module.exports.attendEvent = async (req, res) => {
  try {
    const eventCheck = await Event.findOne({ "attenders._id": req.user.id });

    if (eventCheck) {
      res.status(500).send("You are already an attender to this event!");
      return;
    }

    const event = await Event.findByIdAndUpdate(req.params.eventId, {
      $push: {
        attenders: req.user
      }
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        eventsAttended: event
      }
    });

    res.send("OK");
  } catch (err) {
    res.status(404).send("Event not find!");
  }
};
