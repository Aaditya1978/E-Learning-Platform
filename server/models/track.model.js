const mongoose = require("mongoose");

const Track = new mongoose.Schema(
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
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseData",
      },
    ],
  }, { collection: "track-data" }
);

const model = mongoose.model("TrackData", Track);

module.exports = model;
