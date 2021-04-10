const { io } = require('./index');
const Question = require('./models/Question');
const Classroom = require('./models/Classroom');
const authSocket = require('./middlewares/auth-socket');

io.use(authSocket);

io.on('connection', socket => {
  socket.on('joining', async ({ meetId }) => {
    // class with given meetId exists or not
    const classroom = await Classroom.findOne({ meetId });
    
    if (!classroom) {
      console.log('Classroom not found with given meetId');
      return;
    }
    // check user is valid or not
    // const isValid =
    //   (classroom && classroom.adminId.equals(userId)) ||
    //   classroom.users.find((user) => user.id.equals(userId));
    socket.meetId = meetId;
    socket.adminId = classroom.adminId.toString();
    socket.join(meetId);
    // emit joining success event to admin and current user itself
    io.to(classroom.adminId).to(socket.id).emit('joining_success', socket.user);
  });

  socket.on('broadcast_question', async ({ questionId }) => {
    const userId = socket.user._id;
    const question = await Question.findById(questionId).select('-answer');
    // check for access
    if (question.adminId.equals(userId)) {
      // broadcast question to students
      question.brodcasted = true;
      await question.save();
      socket.broadcast.to(question.meetId).emit('question', question);
    } else {
      return new Error("you don't access to brodcast this question");
    }
  });

  socket.on('disconnect', async () => {
    console.log(`admin while disconnect`, socket.adminId);
    console.log(`disconnect meetId`, socket.meetId);
    io.to(socket.id).to(socket.adminId).emit('user_left', socket.user);
  });

  socket.on('error', err => {
    console.log(`${socket.id} disconnected due to error`);
    console.log(err);
    // socket.disconnect();
  });
});

// console.log(socket.rooms)

// https://stackoverflow.com/a/6967755/11922517
// to get all the clients of the room
// io.sockets.clients(roomName)

//https://stackoverflow.com/a/61133712/11922517
//https://socket.io/docs/v4/rooms/
// to send msg to single client
// useful to send logs
// or joining msg instead of sending to all the clients
//    io.to(socket.id).emit('private', 'you're secret code is ' + code);
