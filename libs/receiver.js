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
        console.log("received");
        rooms[roomId].receive(data,socket.id);
    });

    

}
