const { io } = require('./index');
const moment = require('moment');
const Question = require('./models/Question');
const Classroom = require('./models/Classroom');
const authSocket = require('./middlewares/auth-socket');
const LectureResponse = require('./models/LectureResponse');
io.use(authSocket);

io.on('connection', (socket) => {
  socket.on('joining', async ({ meetId }) => {
    // class with given meetId exists or not
    const classroom = await Classroom.findOne({ meetId });

    if (!classroom) {
      console.log('Classroom not found with given meetId');
      return;
    }

    socket.meetId = meetId;
    socket.adminId = classroom.adminId.toString();
    socket.join(meetId);

    const _lectureResp = await LectureResponse.findOne({
      meetId,
      userId: socket.user._id,
      date: moment(Date.now()).format('YYYY-MM-DD'),
    });
    if (!_lectureResp) {
      // create empty lecture response
      if (!socket.user._id.equals(socket.adminId)) {
        const resp = new LectureResponse({
          meetId,
          userId: socket.user._id,
          date: moment(Date.now()).format('YYYY-MM-DD'),
        });
        await resp.save();
      }
      console.log(
        `joined user ${socket.user.name} is not admin of the meet ${meetId}`
      );
    }

    // emit joining success event to admin and current user itself
    io.to(classroom.adminId).to(socket.id).emit('joining_success', socket.user);
  });

  socket.on('broadcast_question', async ({ questionId }) => {
    // console.log('Inside api: Request to broadcast question from background');
    const userId = socket.user._id;
    const question = await Question.findById(questionId).select('-answer');
    // check for access
    if (question.adminId.equals(userId)) {
      // broadcast question to students
      question.brodcasted = true;
      await question.save();
      console.log('IS ADMIN', question);
      socket.to(question.meetId).emit('question', question);
    } else {
      return new Error("you don't access to brodcast this question");
    }
  });

  socket.on('disconnect', async () => {
    const { adminId, meetId, user } = socket;
    console.log(`disconnected user`, socket.user.name);
    console.log(`disconnected meetId`, socket.meetId);

    // update lecture response

    const resp = await LectureResponse.findOne({
      meetId,
      userId: user._id,
      date: moment(Date.now()).format('YYYY-MM-DD'),
    });

    if (!resp) {
      const _resp = new LectureResponse({
        meetId,
        userId: user._id,
        date: moment(Date.now()).format('YYYY-MM-DD'),
      });
      await _resp.save();
      return;
    }
    resp.timePresent += Math.floor(
      (Date.now() - new Date(resp.updatedAt).getTime()) / 60000
    );
    await resp.save();
    io.to(socket.id).to(socket.adminId).emit('user_left', socket.user);
  });

  socket.on('error', (err) => {
    console.log(`${socket.id} disconnected due to error`);
    console.log(err);
    // socket.disconnect();
  });

  socket.on('updateActivity', async data => {
    const { message, url } = data;
    const { user, meetId, adminId } = socket;
    console.log(user.name, meetId, 'updateActivity');

    if (user._id.equals(adminId)) {
      console.log('we are not going to store activity of admin');
      return;
    } else {
      const resp = await LectureResponse.findOne({
        meetId,
        userId: user._id,
        date: moment(Date.now()).format('YYYY-MM-DD'),
      });

      if (!resp) {
        const _resp = new LectureResponse({
          meetId,
          userId: user._id,
          date: moment(Date.now()).format('YYYY-MM-DD'),
        });
        await _resp.save();
        return;
      }
      resp.flagCount = resp.flagCount + data.flag;
      resp.timePresent += Math.floor(
        (Date.now() - new Date(resp.updatedAt).getTime()) / 60000
      );
      resp.activity.push({ message, url });
      await resp.save();
      console.log(resp);
    }
  });
});