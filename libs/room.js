/*******************************************************************
***  File Name          : room.js
***  Version            : V1.1
***  Designer           : 曾根 悠太
***  Date               : 2022.07.04
***  Purpose            : matchingとgameを橋渡しする関数をここに記述
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.06.21
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const Game = require('./game.js');
//room.js
//matchingとgameを橋渡しする関数をここに記述

exports.startGame = function(io,socket,RoomId,userList,){
    const game = new Game(RoomId,userList);
    game.startGame(io,socket);
}