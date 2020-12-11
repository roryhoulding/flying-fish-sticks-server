const availableRooms = require('../availableRooms');
const activeRooms = require('../activeRooms');
const Game = require('../../modules/game'); 

exports.createNewGameRoom = (socket, io) => {
  // Chek if free room available
  if (!availableRooms[0]) {
    socket.emit('err', 'No free rooms');
    return;
  }

  // Set room code to last in array of available room codes
  // Use last for effciciency of long array
  // Remove room code from list of available room codes
  const roomCode = availableRooms.pop();

  // Create new game and add to activeRooms object
  // Perhaps change this from game to GameRoom class?
  // And have a game class on a game room?
  const game = new Game(roomCode, io);

  // Add the game and room code to activeRooms data 
  // Each room can have 1 game
  activeRooms[roomCode] = game;
  
  console.log('Created new game room: ', roomCode);

  // Let client know the new room was created
  socket.emit('createdNewGameRoom', roomCode);
}