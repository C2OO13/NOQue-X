const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');
const moment = require('moment');

exports.addQuestions = async (req, res) => {
  const meetId = req.params.meetId;
  if (!meetId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `meetId required` });
  }
  try {
    const question = await Question.findOneAndUpdate(
      {
        meetId,
      },
      {},
      { new: true, upsert: true }
    );
    const allQuestions = question.allQuestions;
    const index = allQuestions.findIndex(({ date }) => {
      const inputDate = new Date(req.body.date).getTime();
      return date.getTime() === inputDate;
    });
    
    if (index === -1) {
      allQuestions.push({
        date: moment(req.body.date).format('YYYY-MM-DD'), // ! DD-MM-YYYY
        questions: req.body.questions,
      });
    } else {
      allQuestions[index].questions.push(...req.body.questions);
    }

    await question.save();
    console.log(question);
    return res.status(StatusCodes.OK).json({ data: question });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while adding new questions' });
  }
};
