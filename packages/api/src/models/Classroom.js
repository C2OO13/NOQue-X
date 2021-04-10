const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema(
  {
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
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    batch: {
      type: Date,
      required: true,
    },
    meetId: {
      type: String,
      required: true,
      unique: true,
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    users: [UserInfo],
  },
  { timestamps: true }
);

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;
