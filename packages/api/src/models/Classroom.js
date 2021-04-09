const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ClassroomSchema = new mongoose.Schema(
  {
    meetId: {
      type: String,
      required: true,
      unique: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    users: [UserInfo],
  },
  { timestamps: true }
);

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;
