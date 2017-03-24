// we need a list of funtions to operate on a shared resource, so a class is best
// instaed of creating adhoc functions and individually exporting them

// class Person {
//   constructor(name,age){
//     // this refers to the individual instance
//     this.name= name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// var me = new Person('anil',20);
// console.log(me.getUserDescription());

// storing the people in rooms in an array identified by socket.id, name ,room
// [{
//   id:'some unique id',
//   name: 'anil',
//   room : 'coders'
// }]
class Users {
  constructor() {
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => {
          return user.id !== id;
      });
    };
    return user;
  }
  getUser(id) {
    var arr = this.users.filter((user) => {
      return user.id === id;
    });
    // return undefined if that unique id does not exist
    return arr[0];
  }
  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {
  Users: Users
};

// var a = new Users();
// a.addUser('1','anil','1');
// a.addUser('2','anil1','2');
// a.addUser('3','anil2','1');
// console.log(a.removeUser('1'));
