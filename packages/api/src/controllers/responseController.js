const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');

/**
 * @desc     to get response of all users for a question
 * @route   GET /api/responses/:questionId
 * @access  private
 */
exports.getResponses = async (req, res) => {
  const { questionId } = req.params;
  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `questionId required` });
  }
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Question with given id not found` });
    }
    return res.status(StatusCodes.OK).json({ data: question.responses });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `something went wrong while fetching responses of question#${questionId}`,
    });
  }
};

/**
 * @desc    to add responoses of a question with questionID
 * @route   PATCH /api/responses/:userId/:questionId
 * @access  private
 */
exports.setResponse = async (req, res) => {
  const { userId, questionId } = req.params;
  if (!userId || !questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `userId and questionId required` });
  }
  try {
    const question = await Question.findOne({ _id: questionId });
    if (!question) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Question with given id not found` });
    }
    question.responses.push({
      userId,
      response: req.body.response,
      score: req.body.response.toLowerCase() === question.answer.toLowerCase(), // TODO: need better way to compare answers
    });
    await question.save();
    return res.status(StatusCodes.OK).json({ data: question.responses });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while setting responses' });
  }
};
