const LectureResponse = require('../models/LectureResponse');

const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const Classroom = require('../models/Classroom');

exports.initLectureResponse = async (req, res) => {
  const meetId = req.params.meetId;
  const date = req.params.date;
  const userId = req.user._id;
  const updatedAt = Date.now();
  try {
    const lectureResponse = new LectureResponse({
      updatedAt,
      meetId,
      userId,
      date,
    });
    await lectureResponse.save();
    return res.status(StatusCodes.OK).json({ data: lectureResponse });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'something went wrong while adding lecture response of user',
    });
  }
};

exports.UpdateResponseOnAnswer = async (req, res) => {
  const meetId = req.params.meetId;
  const date = req.params.date;
  const userId = req.user._id;

  const { error, value } = Joi.object({
    //0=> Incorrect answer  1=> Correct Answer 2=> No response given
    answerStatus: Joi.number().integer().required(),
  }).validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: error.details[0].message });
  }
  try {
    const lectureResponse = await LectureResponse.findOne({
      meetId,
      userId,
      date,
    });
    console.log(lectureResponse);
    //change count of correct or incorrect answer
    if (value == 0) {
      lectureResponse.ansIncorrect += 1;
      //update flag by 1 if answer is incorrect
      lectureResponse.flagCount += 1;
    } else if (value == 1) {
      lectureResponse.ansCorrect += 1;
    } else {
      //update flag by 5 if no answer is submitted
      lectureResponse.flagCount += 5;
    }
    await lectureResponse.save();
    return res.status(StatusCodes.OK).json({ data: lectureResponse });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        'something went wrong while updating lecture response of user when response submitted',
    });
  }
};

exports.UpdateResponseOnDisconnect = async (req, res) => {
  const meetId = req.params.meetId;
  const date = req.params.date;
  const userId = req.user._id;
  try {
    const lectureResponse = await LectureResponse.findOne({
      meetId,
      userId,
      date,
    });
    console.log(lectureResponse);
    //change timePresent in mins and parse as int
    lectureResponse.timePresent += Math.floor(
      (new Date.now().getTime() - lectureResponse.updatedAt.getTime()) / 60000
    );
    //update flag by 1
    lectureResponse.flagCount += 1;
    await lectureResponse.save();
    return res.status(StatusCodes.OK).json({ data: lectureResponse });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        'something went wrong while changing lecture response of user when disconnected',
    });
  }
};

exports.getLectureResponses = async (req, res) => {
  const meetId = req.params.meetId;
  const date = req.params.date;

  try {
    const lectureResponses = await LectureResponse.find({
      meetId: meetId,
      date: date,
    })
      .select('-date -meetId -updatedAt')
      .populate('userId');

    // console.log(lectureResponses);
    // console.log(meetId);
    const classroom = await Classroom.findOne({ meetId }).select('adminId');

    if (!lectureResponses) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Lecture Responses not found` });
    }

    // check for access to view
    if (!classroom.adminId.equals(req.user._id)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to view the lecture responses` });
    }

    return res.status(StatusCodes.OK).json({ data: lectureResponses });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting lecture responses' });
  }
};

exports.getSingleResponse = async (req, res) => {
  const { date, meetId, userId } = req.params;

  try {
    const lectureResponses = await LectureResponse.findOne({
      meetId,
      userId,
      date,
    })
      .select('activity userId')
      .populate('userId');

    if (!lectureResponses) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Lecture Responses not found` });
    }
    // console.log(lectureResponses);
    const classroom = await Classroom.findOne({ meetId }).select('adminId');

    // check for access to view
    if (!classroom.adminId.equals(req.user._id)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: `You don't have access to view the lecture responses` });
    }

    return res.status(StatusCodes.OK).json({ data: lectureResponses });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting lecture responses' });
  }
};
