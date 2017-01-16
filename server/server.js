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

  socket.on('disconnect' ,() => {
    console.log('User Disconnected');
  });

});

app.use(express.static(publicPath));

server.listen(port , () => {
  console.log(`Server is up on ${port} `);
});
