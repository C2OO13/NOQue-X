const mongoose = require('mongoose');
const moment = require('moment');

const ResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    response: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema({
  meetId: {
    type: String,
    required: true,
  },
  classroomId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Classroom',
  },
  adminId: {
    // ! required to check access to view this question
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: Date,
    default: moment(Date.now()).format('YYYY-MM-DD'),
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  responses: [ResponseSchema],
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
