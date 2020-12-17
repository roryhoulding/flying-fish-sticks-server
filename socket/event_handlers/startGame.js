// Data
const activeRooms = require('../activeRooms');

exports.startGame = (roomCode) => {
    const gameRoom = activeRooms[roomCode];
    // No game found
    if (!gameRoom) {
        return;
    }
    // If game room is already in the middle of a game
    if (gameRoom.status === 'in-a-game') {
        return;
    }
    gameRoom.createNewGame();
    gameRoom.startGame();
    gameRoom.updateClients();
}