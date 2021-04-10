const { StatusCodes } = require('http-status-codes');
const Classroom = require('../models/Classroom');
const Joi = require('joi');

/**
 * @desc    to get all classes using adminId
 * @route   GET /api/classes/
 * @access  private
 */
exports.getAllClasses = async (req, res) => {
  const adminId = req.user._id;
  try {
    const classes = await Classroom.find({ adminId });
    return res.status(StatusCodes.OK).json({ data: classes });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while fetching classes' });
  }
};

/**
 * @desc    to create new class
 * @route   POST /api/classes
 * @access  private
 */
exports.createClass = async (req, res) => {
  const adminId = req.user._id;
  const { error, value } = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    meetId: Joi.string().required(),
    batch: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: error.details[0].message });
  }

  try {
    const classroom = new Classroom({
      ...value,
      adminId,
    });
    await classroom.save();
    return res.status(StatusCodes.OK).json({ data: classroom });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while create new class' });
  }
};

/**
 * @desc    to get basic info of a class by classId
 * @route   GET /api/classes/:classId/info
 * @access  private
 */
exports.getClassInfo = async (req, res) => {
  const classId = req.params.classId;
  try {
    const classroom = await Classroom.findById(classId).select('-users');
    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Classroom not found` });
    }
    return res.status(StatusCodes.OK).json({ data: classroom });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting classroom info' });
  }
};

/**
 * @desc    to get list of all students
 * @route   GET /api/classes/:classId/students
 * @access  private
 */
exports.getAllStudents = async (req, res) => {
  const classId = req.params.classId;
  try {
    const classroom = await Classroom.findById(classId).select('users');
    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Classroom not found` });
    }
    return res.status(StatusCodes.OK).json({ data: classroom.users });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while getting students list' });
  }
};

/**
 * @desc    to append a student in the students list
 * @route   PATCH /api/classes/:classId/student
 * @access  private
 */
exports.addAStudent = async (req, res) => {
  const classId = req.params.classId;

  const { error, value } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }).validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: error.details[0].message });
  }

  try {
    const _classroom = await Classroom.findById(classId);
    if (!_classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Classroom not found` });
    }

    const classroom = await Classroom.findOneAndUpdate(
      { _id: classId, 'users.email': { $ne: value.email } },
      {
        $addToSet: {
          users: {
            ...value,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!classroom) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Student already in classroom` });
    }
    // return sorted users by name
    const sortedUsers = [...classroom.users];
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    return res.status(StatusCodes.OK).json({ data: sortedUsers });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'something went wrong while adding new student into class',
    });
  }
};

/**
 * @desc    to append array of student in the students list
 * @route   PATCH /api/classes/:classId/students
 * @access  private
 */
exports.addStudents = async (req, res) => {
  // recieves array of userInfo -> [{ name, email}]
  const classId = req.params.classId;

  const userInfo = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const { error, value } = Joi.object({
    users: Joi.array().items(userInfo),
  }).validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: error.details[0].message });
  }

  const newUsers = value.users;

  try {
    const classroom = await Classroom.findById(classId).select('users');

    const allUsers = classroom.users;

    newUsers.forEach(user => {
      const found = allUsers.find(_user => _user.email === user.email);
      console.log(found);
      if (!found) allUsers.push(user);
    });
    await classroom.save();

    console.log(classroom.users);

    // return sorted users by name
    const sortedUsers = [...classroom.users];
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));

    return res.status(StatusCodes.OK).json({ data: sortedUsers });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'something went wrong while adding new students into class',
    });
  }
};
