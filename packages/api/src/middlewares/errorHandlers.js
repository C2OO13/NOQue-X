const { StatusCodes } = require('http-status-codes');
const { JsonWebTokenError } = require('jsonwebtoken');

// https://expressjs.com/en/guide/error-handling.html

const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something broke!');
  } else if (err instanceof JsonWebTokenError) {
    if (err.message === 'jwt expired')
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `jwt expired` });
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `invalid token` });
  } else next();
};

module.exports = errorHandler;
