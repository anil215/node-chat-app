const path = require('path'); // prevent repetition of paths
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users.js');
var app = express();
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server); // ready to accept connections
var users = new Users();
const {mongoose} = require('./db/mongoose.js');
const {Message} = require('./models/my_message.js');
var rooms = [];

// the socket.id is important in accessing the users
// build in function checks for new connection to this server via client
io.on('connection', (socket) => { // this socket is individual socket with which server is trigerred
  console.log('New User connected');

  socket.on('join',(params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    params.room = params.room.toLowerCase();
    socket.join(params.room);
    if(!(rooms.includes(params.room))){
      rooms.push(params.room);
    }
    // Do not let users take a room that is already taken
    var usernames = users.getUserList(params.room);
    for(var i=0;i<usernames.length;i++){
      if(usernames[i] === params.name){
         callback('Name already taken!!');
      }
    }
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    Message.find({
      room:params.room
    }).then((all_messages) => {
      all_messages.map((doc) => {
        socket.emit('newMessage',generateMessage(doc.username,doc.message,doc.time));
        console.log(doc.time);
      })
    });

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'));
    // alerts everyone but the user sending the message
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
    callback();
  });

  // socket signifies an individual connected whicle io is used for everyone
  socket.on('createMessage', (data,callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(data.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,data.text));

        var newMessage = new Message({
          username:user.name,
          time: moment().valueOf(),
          message: data.text,
          room : user.room
        });
        newMessage.save().then((message) => {
          console.log('message saved!!');
        },(e) => {
          console.log('error occued',e);
        });
    }
    callback();
  });

  socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);

    if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }

  });

  socket.on('disconnect' ,() => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
    console.log('User Disconnected');
  });

});

app.use(express.static(publicPath));

server.listen(port , () => {
  console.log(`Server is up on ${port} `);
});
