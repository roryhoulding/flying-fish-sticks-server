const { createNewGameRoom } = require('./event_handlers/createNewGameRoom');
const { attemptJoinGameRoom } = require('./event_handlers/attemptJoinGameRoom');

module.exports = (socket, io) => {
  // console.log(io);

  socket.on('createNewGameRoom', () => {
    createNewGameRoom(socket, io)
  });

  socket.on('attemptJoinGameRoom', (roomCode) => {
    console.log(roomCode);
    attemptJoinGameRoom(socket, roomCode)
  })

}