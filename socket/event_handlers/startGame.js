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

    // Otherwise, create a new game for the gameRoom
    gameRoom.createNewGame();

    // Set up a listener to updateClients whenever the time changes
    // This ensures all clients see the same time left in a round
    // And their game stays in sync
    gameRoom.currentGame.on('timeLeftChange', (timeLeft) => {
        gameRoom.updateClients();
    });

    // Update Clients with the gameRoom
    // Require response means that clients must send a message 
    // Back to the server, that message then triggers a function
    gameRoom.updateClients({requiresResponse: 'readyForRound'});
}