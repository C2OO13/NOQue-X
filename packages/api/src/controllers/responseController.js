const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');
const Classroom = require('../models/Classroom');
const Joi = require('joi');

/**
 * @desc    to add responoses of a question with questionId
 * @route   PATCH /api/responses/:questionId
 * @access  private
 */
exports.setResponse = async (req, res) => {
  const userId = req.user._id;
  const userEmail = req.user.email;
  const { questionId } = req.params;

  // validate req.body
  const { error, value } = Joi.object({
    response: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: error.details[0].message });
  }

  try {
    const question = await Question.findOne({ _id: questionId });
    if (!question) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Question with given id not found` });
    }
    // only students of this class can add responses
    const classroom = await Classroom.findById(question.classroomId).select(
      'users'
    );
    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `This question doesn't belongs to any classroom` });
    }
    const haveAccess = classroom.users.find((user) => user.email === userEmail);

    if (!haveAccess) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to submit your responses` });
    }
    const responses = question.responses;

    // if user already submitted response for this question
    const alreadySubmitted = responses.find((resp) => resp.userId === userId);

    if (alreadySubmitted) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You have already submitted your response` });
    }

    responses.push({
      userId,
      ...value,
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
