const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Track = require("../models/track.model");
const Course = require("../models/course.model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: "Internal server error",
      });
    } else {
      try {
        const user = await User.create({
          name,
          email,
          password: hash,
        });
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(201).json({
          token: token,
        });
      } catch (err) {
        return res.status(409).json({
          error: "Email already exists",
        });
      }
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return res.status(401).json({
      error: "User not found",
    });
  }
  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      return res.status(401).json({
        error: "Password incorrect",
      });
    }
    if (result) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );
      return res.status(200).json({
        token: token,
      });
    } else {
      return res.status(401).json({
        error: "Password incorrect",
      });
    }
  });
});

router.post("/verifyToken", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      return res.status(200).json({
        user: user,
      });
    } else {
      return res.status(401).json({
        error: "User not found",
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
});

router.get("/getAllTracks", async (req, res) => {
  const tracks = await Track.find({});
  return res.status(200).json({
    tracks: tracks,
  });
});

router.post("/getTrackById", async (req, res) => {
  const { id } = req.body;
  const track = await Track.findById(id);
  const courses = await Track.findById(id).populate("courses");
  return res.status(200).json({
    track: track,
    courses: courses,
  });
});

router.post("/getCourseById", async (req, res) => {
  const { id } = req.body;
  const course = await Course.findById(id);
  return res.status(200).json({
    course: course,
  });
});

module.exports = router;
