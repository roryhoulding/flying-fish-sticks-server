// Modules
const Player = require('../../modules/player'); 

// Data
const activeRooms = require('../activeRooms');

exports.attemptJoinGameRoom = (socket, roomCode) => {
  console.log('Someone is attempting to join room', roomCode);
  const game = activeRooms[roomCode];

  // Check if room exists
  if (!game) {
    socket.emit('err', {msg: 'Room does not exist'});
    return;
  } 

  // Check if game has started
  if (game.started) {
    socket.emit('err', {msg: 'Game has already started'});
    return;
  } 

  game.test();

  // Init player
  const player = new Player(socket.id);
  game.setPlayer(player);

  // Player joins socket room
  // Used for emitting and broadcasting
  socket.join(roomCode);

  socket.emit('joinedGameRoom');
} 