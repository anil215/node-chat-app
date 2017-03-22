const expect = require('expect');
var {isRealString} =require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var msg = 123;
    expect(isRealString(msg)).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var msg = '   ';
    expect(isRealString(msg)).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var msg = '   abc  ';
    expect(isRealString(msg)).toBe(true);
  });
});
