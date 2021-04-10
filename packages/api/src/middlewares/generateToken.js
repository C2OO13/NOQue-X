const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { CLIENT_URL } = require('../config');

const generateToken = (req, res) => {
  const userData = {
    _id: req.user._id,
    googleId: req.user.googleId,
    name: req.user.name,
    picture: req.user.picture,
  };
  // create new JWT token
  const token = jwt.sign(userData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '7h',
  });
  const OAuthSuccessPage = `
  <html>
    <head>
    </head>
    <body>
      <script>
      window.onload = window.close();
      window.opener.postMessage('?jwt=${token}', '${CLIENT_URL}');
      </script>
    </body>
  </html>`;
  return res.status(StatusCodes.OK).send(OAuthSuccessPage);
};

module.exports = generateToken;
