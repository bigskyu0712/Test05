const server = require('../server.js');

//レシーバ，クライアントからのemitを受け取ります

exports.startReceive = function(io,socket,rooms){
    socket.on('ping', function(){
        console.log("pong!! id:" + socket.id + " room:" + JSON.stringify(socket.rooms));
    });

    socket.on('drawed', function(){
        rooms[Array.from(socket.rooms[1])].next();
        console.log("drawed!!");
    });

}
