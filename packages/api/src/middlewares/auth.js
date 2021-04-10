const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { cookieExtractor } = require('../utils');

const auth = async (req, res, next) => {
  console.log(req.cookies);
  const token = cookieExtractor(req);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          error: 'Unauthorized user!',
        });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.status(StatusCodes.FORBIDDEN).json({
      error: 'No auth token provided',
    });
  }
};

module.exports = auth;
