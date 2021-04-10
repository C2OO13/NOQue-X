const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');
const Classroom = require('../models/Classroom');
const Joi = require('joi');
const moment = require('moment');

/**
 * @desc    to add questions (date must be provided in req.body)
 * @route   POST /api/questions/:classroomId
 * @access  private
 */
exports.addQuestions = async (req, res) => {
  const classroomId = req.params.classroomId;

  const { error, value } = Joi.object({
    body: Joi.string().required(),
    answer: Joi.string().required(),
    date: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: error.details[0].message });
  }
  try {
    // check class exists or not
    const classroom = await Classroom.findById(classroomId).select('-users');
    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Classroom not found` });
    }
    // check for access to add questions in this classrooom
    if (!classroom.adminId.equals(req.user._id)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to view this class` });
    }
    // now create new question
    const question = new Question({
      ...value,
      date: moment(value.date).format('YYYY-MM-DD'),
      meetId: classroom.meetId,
      classroomId: classroom._id,
      adminId: classroom.adminId,
    });
    await question.save();

    return res.status(StatusCodes.OK).json({ data: question });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while adding new question' });
  }
};

/**
 * @desc    to get question details
 * @route   GET /api/questions/:questionId/info
 * @access  private
 */
exports.getQuestionDetails = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const question = await Question.findOne({
      _id: questionId,
    }).select('-responses');

    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Question not found` });
    }
    // check for access to view
    if (!question.adminId.equals(req.user._id)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to view this class` });
    }
    return res.status(StatusCodes.OK).json({ data: question });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting question details' });
  }
};

/**
 * @desc    to get question responses
 * @route   GET /api/questions/:questionId/responses
 * @access  private
 */
exports.getQuestionResponses = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const question = await Question.findOne({
      _id: questionId,
    }).select('responses adminId');

    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Question not found` });
    }
    // check for access to view
    if (!question.adminId.equals(req.user._id)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to view this class` });
    }
    return res.status(StatusCodes.OK).json({ data: question.responses });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting question details' });
  }
};

/**
 * @desc    to get all questions responses stats by date
 * @route   GET /api/questions/:classroomId/stats/:date
 * @access  private
 */
exports.getQuestionsStats = async (req, res) => {
  const { classroomId, date } = req.params;
  try {
    // check class exists or not
    const classroom = await Classroom.findById(classroomId).select('-users');
    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Classroom not found` });
    }
    // check for access to add questions in this classrooom
    if (!classroom.adminId.equals(req.user._id)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to view this class` });
    }

    const questions = await Question.find({ classroomId, date });
    // console.log(questions);
    if (!questions) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Questions not found` });
    }
    const response = [];
    questions.forEach((question) => {
      const attemptedCount = question.responses.length;
      console.log(attemptedCount);
      const correctAnsCount = question.responses.filter((e) => e.score === true)
        .length;
      // console.log(`correctAnsCount ${correctAnsCount}`);
      const wrongAnsCount = attemptedCount - correctAnsCount;

      response.push({
        questionId: question._id,
        questionDescription: question.body,
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
