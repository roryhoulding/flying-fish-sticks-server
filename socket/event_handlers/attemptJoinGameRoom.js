// Modules
const Player = require('../../modules/player'); 

// Data
const activeRooms = require('../activeRooms');

exports.attemptJoinGameRoom = (socket, roomCode) => {
  console.log('Someone is attempting to join room', roomCode);
  const gameRoom = activeRooms[roomCode];

  // Check if room exists
  if (!gameRoom) {
    socket.emit('roomDoesNotExist');
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
  // Takes ID and an emojiCode
  const emoji = gameRoom.getEmoji();
  const player = new Player(socket.id, emoji);

  // Add player to gameRoom 
  // This also sends the players to everyone in the gameRoom
  gameRoom.setPlayer(player);

  // Set gameRoom on socket for reference when 
  // player leaves gameRoom or disconnects
  socket.gameRoom = roomCode;
  
  // Player joins socket room
  // Used for emitting and broadcasting
  socket.join(roomCode);
  
  // Update all players in the game room
  gameRoom.updateClients();
} 