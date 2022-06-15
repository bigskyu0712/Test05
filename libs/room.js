const Game = require('./game.js');
//room.js
//matchingとgameを橋渡しする関数をここに記述

exports.startGame = function(io,socket,RoomId,userList,){
    const game = new Game(RoomId,userList);
    game.startGame(io,socket);
}