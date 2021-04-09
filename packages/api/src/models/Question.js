const mongoose = require('mongoose');
const moment = require('moment');

const ResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    score: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: moment(Date.now()).format('YYYY-MM-DD'),
    },
    questions: [
      {
        body: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        responses: [ResponseSchema],
      },
    ],
  },
  { _id: false }
);

const MeetQuestionSchema = new mongoose.Schema({
  meetId: {
    type: String,
    required: true,
  },
  allQuestions: [QuestionSchema],
});

const MeetQuestion = mongoose.model('MeetQuestion', MeetQuestionSchema);

module.exports = MeetQuestion;
