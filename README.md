# node-chat-app

A chat application created using socket-io which uses MongoDB database in the backend to provide realtime messaging ability.
FEATURES:
1. Concept of separate rooms was implemented, people in one room cannot see the messages in other rooms.
2. A list on left side of the screen shows the list of users logged in that room.
3. No two people in one room can have the same username.
4. When a user enters a room he is able to see the messages which have been entered by others before he logged in using the MongoDB 
   database.
5. A messaging box is provided at bottom and the user types the messages, clicks on send and the message is displayed to all users
   logged in that room as well as stored in database for future users to login. The message is displayed with the name of the person
   and the time when the user typed in the message.
6. Users logged in can also share their location to others in a room.
