const { StatusCodes } = require('http-status-codes');
const Classroom = require('../models/Classroom');

/**
 * @desc    to get all classes using adminId
 * @route   GET /api/classes/:adminId
 * @access  private
 */
exports.getAllClasses = async (req, res) => {
  const adminId = req.params.adminId;
  if (!adminId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `adminId required` });
  }
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
 * @route   POST /api/classes/:adminId
 * @access  private
 */
exports.createClass = async (req, res) => {
  // TODO: req body validation
  const adminId = req.params.adminId;
  if (!adminId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `adminId required` });
  }
  try {
    const classroom = new Classroom({
      ...req.body,
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
