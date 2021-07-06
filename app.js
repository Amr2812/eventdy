const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

require("dotenv").config();

require("./config/passport")(passport);

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/event.route");

const app = express();

app.set("trust proxy", 1);

// DB Config
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let secure = process.env.NODE_ENV === "production" ? true : false;

// express-session
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    rolling: true,
    resave: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      secure,
      httpOnly: true,
      maxAge: 1209600000 // 2 weeks
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", eventRouter);

module.exports = app;
