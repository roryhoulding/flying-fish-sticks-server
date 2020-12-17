const { createNewGameRoom } = require('./event_handlers/createNewGameRoom');
const { attemptJoinGameRoom } = require('./event_handlers/attemptJoinGameRoom');
const { disconnect } = require('./event_handlers/disconnect');
const { nameChange } = require('./event_handlers/nameChange');
const { startGame } = require('./event_handlers/startGame');

module.exports = (socket, io) => {
  // console.log(io);

  socket.on('createNewGameRoom', () => {
    createNewGameRoom(socket, io)
  });

  socket.on('attemptJoinGameRoom', (roomCode) => {
    attemptJoinGameRoom(socket, roomCode)
  })

  socket.on('disconnect', (reason) => {
    disconnect(reason, socket)
  })

  socket.on('nameChange', (name) => {
    nameChange(socket, name)
  })

  socket.on('startGame', () => {
    startGame(socket.gameRoom);
  })

}