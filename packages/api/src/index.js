const express = require('express');
const path = require('path');
require('dotenv').config();
require('./config/db')();
const cors = require('cors');
const morgan = require('morgan');
const apiRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandlers');
const passport = require('passport');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();
app.set('env', process.env.NODE_ENV);

// Middlewares

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'chrome-extension://cconbeciphdmhmfoledfkdkjkdfamiem',
      'https://meet.google.com/'
    ],
  })
);

app.use(cookieParser());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

app.use('/api', apiRouter);

// passport middlewares
require('./middlewares/auth-passport');
app.use(passport.initialize());

// error handling
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`listening on http://localhost:${PORT}`)
);
exports.io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

require('./sockets');
