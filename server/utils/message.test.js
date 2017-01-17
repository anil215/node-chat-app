var expect = require('expect');

var {generateMessage , generateLocationMessage} = require('./message');

describe('generateMessage' ,() => {
  it('should generate the correct message object', () => {
    var from = 'anil';
    var text = 'Some message';
    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from : from,
      text:text
    });
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location', () => {
    var lat=1,lng=2;
    var from = 'anil';
    var message = generateLocationMessage(from,lat,lng);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from : from,
      url : `https://www.google.com/maps?g=${lat},${lng}`
    });
  });
});
