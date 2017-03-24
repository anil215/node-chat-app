const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },
  time:{
    type:Number,
    required:true
  },
  message:{
    type:String,
    required:true
  },
  room:{
    type:String,
    required:true
  }
});

var Message = mongoose.model('Message',messageSchema);

module.exports = {
  Message:Message
};
