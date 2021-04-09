const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');

/**
 * @desc    to add questions for today
 * @route   POST /api/questions/:meetId
 * @access  private
 */
exports.addQuestions = async (req, res) => {
  const meetId = req.params.meetId;
  if (!meetId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `meetId required` });
  }
  try {
    const question = new Question({
      meetId,
      ...req.body,
    });
    await question.save();
    console.log(question);
    return res.status(StatusCodes.OK).json({ data: question });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while adding new question' });
  }
};

/**
 * @desc    to get question's details with responses by meetId & date
 * @route   GET /api/questions/:meetId/:date
 * @access  private
 */
exports.getQuestionDetails = async (req, res) => {
  const { meetId, date } = req.params;
  if (!meetId || !date) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `meetId or date required` });
  }
  try {
    const questions = await Question.find({ meetId, date });
    console.log(questions);
    if (!questions) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Questions not found` });
    }
    const response = [];
    questions.forEach(question => {
      const attemptedCount = question.responses.length;
      console.log(attemptedCount);
      const correctAnsCount = question.responses.filter(e => e.score === true)
        .length;
      console.log(correctAnsCount);
      const wrongAnsCount = attemptedCount - correctAnsCount;

      response.push({
        questionId: question._id,
        attemptedCount,
        correctAnsCount,
        wrongAnsCount,
      });
    });
    return res.status(StatusCodes.OK).json({ data: response });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting questions' });
  }
};
