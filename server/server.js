const path = require('path'); // prevent repetition of paths
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
var app = express();
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server); // ready to accept connections

// build in function checks for new connection to this server via client
io.on('connection', (socket) => { // this socket is individual socket with which server is trigerred
  console.log('New User connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'));

  // alerts everyone but the user sending the message
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

  socket.on('join',(params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required');
    }
    callback();
  });

  // socket signifies an individual connected whicle io is used for everyone
  socket.on('createMessage', (data,callback) => {
    io.emit('newMessage',generateMessage(data.from,data.text));
    callback();
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

  });

  socket.on('disconnect' ,() => {
    console.log('User Disconnected');
  });

});

app.use(express.static(publicPath));

server.listen(port , () => {
  console.log(`Server is up on ${port} `);
});
