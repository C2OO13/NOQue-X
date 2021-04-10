const CLIENT_URL_DEV = `http://localhost:3000`;
const CLIENT_URL_PROD = `http://localhost:3000`;
const SERVER_URL_DEV = `http://localhost:5000`;
const SERVER_URL_PROD = `https://lecturenquirer.herokuapp.com`;

exports.CLIENT_URL =
  process.env.NODE_ENV === 'production' ? CLIENT_URL_PROD : CLIENT_URL_DEV;
exports.SERVER_URL =
  process.env.NODE_ENV === 'production' ? SERVER_URL_PROD : SERVER_URL_DEV;
