// Modules
const Player = require('../../modules/player'); 

// Data
const activeRooms = require('../activeRooms');

exports.attemptJoinGameRoom = (socket, roomCode) => {
  console.log('Someone is attempting to join room', roomCode);
  const gameRoom = activeRooms[roomCode];

  // Check if room exists
  if (!gameRoom) {
    socket.emit('attemptJoinRoomRes', {doesNotExist: true});
    return;
  } 

  // Check if players are in waiting-room or not
  // If in waiting room can join, otherwise you can't
  // In future could make it so that you sit in the waiting room 
  // Until the next game
  if (gameRoom.status != 'waiting-room') {
    socket.emit('attemptJoinRoomRes', {msg: 'Already playing a game'});
    return;
  }

  // Init player
  const player = new Player(socket.id);
  gameRoom.setPlayer(player);

  // Player joins socket room
  // Used for emitting and broadcasting
  socket.join(roomCode);

  socket.emit('attemptJoinRoomRes', {
    roomCode: gameRoom.getRoomCode(),
    status: gameRoom.status,
    players: gameRoom.getPlayers(),
  });
} 