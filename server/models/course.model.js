const mongoose = require("mongoose");

const Course = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    videos: [
      {
        title: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrackData",
    },
  },
  { collection: "course-data" }
);

const model = mongoose.model("CourseData", Course);

module.exports = model;
