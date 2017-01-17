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
  var messageTextbox = $('[name=message]');

  socket.emit('createMessage',{
    from : 'User',
    text: messageTextbox.val()
  }, function(data) {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click',function() {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Send location..');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })

});
