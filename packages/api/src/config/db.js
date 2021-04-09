const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connected to database');
  } catch (err) {
    console.log('Failed to connect to database.');
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
