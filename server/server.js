const path = require('path'); // prevent repetition of paths
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server); // ready to accept connections

// build in function checks for new connection to this server via client
io.on('connection', (socket) => { // this socket is individual socket with which server is trigerred
  console.log('New User connected');

  socket.emit('newMessage',{
    from:'Admin',
    text : 'Welcome to the chat app',
    createdAt : new Date().getTime()
  });

  // alerts everyone but the user sending the message
  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text : 'New user joined',
    createdAt : new Date().getTime()
  });

  // socket signifies an individual connected whicle io is used for everyone
  socket.on('createMessage', (data) => {
    io.emit('newMessage',{
      from :data.from,
      text : data.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage',{
    //   from :data.from,
    //   text : data.text,
    //   createdAt: new Date().getTime()
    // })
  });


  socket.on('disconnect' ,() => {
    console.log('User Disconnected');
  });

});

app.use(express.static(publicPath));

server.listen(port , () => {
  console.log(`Server is up on ${port} `);
});
