const activeRooms = require('../activeRooms');

exports.disconnect = (reason, socket) => {
    const roomCode = socket.gameRoom;
    const gameRoom = activeRooms[roomCode];
    if (!gameRoom) return;
    gameRoom.deletePlayer(socket.id);
    gameRoom.updateClients();
    console.log(`${socket.id} disconnected`);
}