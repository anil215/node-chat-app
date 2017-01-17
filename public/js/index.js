var socket = io();

socket.on('connect' , function(){
  console.log('Connected to server');
  // you should emit events to server once the connection is established

});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});


socket.on('newMessage', function(data){
  console.log('Data ' , data);
  var li = $('<li></li>');
  li.text(`${data.from}: ${data.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage',function(data) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${data.from}: `);
  a.attr('href',data.url);
  li.append(a);

  $('#messages').append(li);
});

$('#message-form').on('submit',function(e) {
  e.preventDefault();
  socket.emit('createMessage',{
    from : 'User',
    text: $('[name=message]').val()
  }, function(data) {
    console.log(data);
  });
});

var locationButton = $('#send-location');
locationButton.on('click',function() {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location');
  })

});
