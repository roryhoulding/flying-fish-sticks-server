// Data
const activeRooms = require('../activeRooms');

exports.readyForRound = (playerID, roomCode) => {
  const game = activeRooms[roomCode].currentGame;
  const round = game.currentRound;
  game.setPlayerReady(playerID);
  if (round.playersReady.length === game.players.length) {
    game.startRound();
  }
}