const server = require('../server.js');

//UIのサーバ側処理
    
//テスト用になります
exports.test = function(){
        server.io.emit("displayToClient","hoge");
        console.log("そーしんてすと");
}

exports.makeWindow = function(cardId,userId){
    server.io.to(userId).emit("makeWindow",cardId);
}

exports.refreshHands = function(hand,userId){
    server.io.to(userId).emit("refreshHands",hand);
}

exports.selectCard = function(hand,userId){
    server.io.to(userId).emit("selectCard",hand);
}

