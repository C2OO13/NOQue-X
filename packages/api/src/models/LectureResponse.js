const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { _id: false }
);

const LectureResponseSchema = new mongoose.Schema(
  {
    meetId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    flagCount: {
      type: Number,
      default: 0,
    },
    timePresent: {
      type: Number, // minutes
      default: 0,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    activity: [ActivitySchema],
  },
  { timestamps: true }
);

const LectureResponse = mongoose.model(
  'LectureResponse',
  LectureResponseSchema
);

module.exports = LectureResponse;
