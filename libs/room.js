//room.js
//matchingとgameを橋渡しする関数をここに記述

exports.startGame = function(RoomId,userList){
    const game = new Game(RoomId,board);
    game.startGame();
}