const express = require('express');
require('dotenv').config();
require('./config/db')();
const cors = require('cors');
const morgan = require('morgan');
const apiRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandlers');
const PORT = process.env.PORT || 5000;

const app = express();
app.set('env', process.env.NODE_ENV);

// Middlewares

app.use(cors());
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

app.use('/api', apiRouter);

// error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
