const availableRoomCodes = require('../roomCodes');
const inUseRoomCodes = {};

exports.createNewGameRoom = (socket) => {
  // Chek if free room available
  if (!availableRoomCodes[0]) {
    socket.emit('err', 'No free rooms');
    return;
  }

  // Set room code to last in array of available room codes
  // Use last for effciciency of long array
  const roomCode = availableRoomCodes.pop();
  inUseRoomCodes[roomCode] = 'true';

  // Player joins socket room
  socket.join(roomCode);

  console.log('created new game room');
  // Init game
  // playerGame = new Game(roomCode, io);
  // playerGame.setPlayer(player);
  // gameRooms[roomCode] = playerGame;
  socket.emit('createdNewGameRoom', roomCode);
}