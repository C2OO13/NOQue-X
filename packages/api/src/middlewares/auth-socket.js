const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getCookie } = require('../utils');


const authSocket = async (socket, next) => {
  const cookies = socket.request.headers.cookie;
  const token = getCookie('jwt', cookies);
  // console.log(token);
  if (!token) {
    next(new Error('Token not provided!'));
  } else {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      next(new Error('Unauthorized user!'));
    } else {
      socket.user = user;
      next();
    }
  }
};

module.exports = authSocket;
