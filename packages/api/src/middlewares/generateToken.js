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

  return res
    .status(StatusCodes.OK)
    .cookie('jwt', token, {
      maxAge: 7 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .send(OAuthSuccessPage);
};

const OAuthSuccessPage = `
  <html>
    <head>
    </head>
    <body>
      <script>
      window.onload = window.close();
      let originUrl = window.location.origin;
      if (window.location.hostname === 'localhost') {
        originUrl = 'http://localhost:3000'
      }
      window.opener.postMessage('success', originUrl);
      </script>
    </body>
</html>`;

module.exports = generateToken;
