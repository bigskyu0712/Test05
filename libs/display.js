const server = require('../server.js');

//UIのサーバ側処理
    
//テスト用になります
exports.test = function(){
        server.io.emit("displayToClient","hoge");
        console.log("そーしんてすと");
}


//cardIdを投げる
exports.makeWindow = function(cardId,userId){
    server.io.to(userId).emit("makeWindow",cardId);
}

exports.refreshHands = function(hand,userId){
    server.io.to(userId).emit("refreshHands",hand);
}

exports.selectCardFromHand = function(userId){
    server.io.to(userId).emit("selectCard");
}

exports.draw = function(userId){
    
}