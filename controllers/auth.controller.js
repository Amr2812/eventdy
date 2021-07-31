const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

module.exports.signup = (req, res, next) => {
  const { email, password, confirmPassword, username, image_url, bio } =
    req.body;
  let errors = [];

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (!validateEmail(email)) {
    errors.push("The Email is not valid!");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords don't match!");
  }

  if (password.length < 6) {
    errors.push("Password should be more than 6 characters!");
  }

  if (!username) {
    errors.push("Username is required!");
  }

  if (errors.length > 0) {
    res.status(500).send(errors);
    return;
  }

  User.findOne({ email }, { _id: 1 }).then(user => {
    if (user) {
      errors.push("This email is already registered!");
      res.send({ errors });
      return;
    }

    const newUser = new User({
      email,
      password,
      username,
      image_url,
      bio
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            delete user.password;
            res.json(user);
          })
          .catch(err => console.log(err));
      });
    });
    req.login(newUser, err => {
      if (err) {
        return next(err);
      }
    });
  });
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send("Incorrect email or password");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.send("Logged out!");
};
