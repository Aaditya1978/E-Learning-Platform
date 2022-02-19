const moongoose = require("mongoose");

const UserCourse = new moongoose.Schema(
  {
    user: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    checked: [
      {
        type: Boolean,
      },
    ],

    progress: {
      type: Number,
      required: true,
      default: 0,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_completed: {
      type: Date,
    },
  },
  { collection: "user-course" }
);

const model = moongoose.model("UserCourse", UserCourse);

module.exports = model;
