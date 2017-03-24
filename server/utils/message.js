var moment = require('moment');

var generateMessage = (from,text,at) => {
  if(!at){
    createdAt = moment().valueOf();
  } else {
    createdAt = at;
  }
  return {
    from : from,
    text : text,
    createdAt : createdAt
  }
};

var generateLocationMessage = (from,latitude,longitude) => {
  return {
    from : from ,
    url : `https://www.google.com/maps?g=${latitude},${longitude}`,
    createdAt : moment().valueOf()
  };
};

module.exports = {
  generateMessage : generateMessage,
  generateLocationMessage : generateLocationMessage
}
