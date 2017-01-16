var socket = io();

socket.on('connect' , function(){
  console.log('Connected to server');
  // you should emit events to server once the connection is established

  socket.emit('createMessage',{
    from:'anil',
    text:'tested'
  });

});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});


socket.on('newMessage', function(data){
  console.log('Data ' , data);
});
