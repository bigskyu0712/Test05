/*******************************************************************
***  File Name		: receiver.js
***  Version      : V1.1
***  Designer	  : 曾根 悠太
***  Date		  : 2022.07.4
***  Purpose      : レシーバ，クライアントからのemitを受け取ります
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.06.21
*** v1.1 : 曾根 悠太, 2022.07.04
*/
const server = require('../server.js');

//レシーバ，クライアントからのemitを受け取ります

exports.startReceive = function(io,socket,rooms){
    socket.on('ping', function(){
        console.log("pong!! id:" + socket.id + " room:" + Array.from(socket.rooms));
    });
    
    socket.on('processed', function(){
        const roomId = Array.from(socket.rooms)[1];
        console.log("processed");
        rooms[roomId].next();
    });

    socket.on('reply',function(data){
        const roomId = Array.from(socket.rooms)[1];
        console.log("received:" + data);
        rooms[roomId].receive(data,socket.id);
    });

    socket.on('throw',function(diceNum){
        const roomId = Array.from(socket.rooms)[1];
        console.log("throw");
        server.io.to(roomId).emit("throw",diceNum);
    });

    

}
