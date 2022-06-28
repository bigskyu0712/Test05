const server = require('../server.js');

//UIのサーバ側処理
    
//テスト用になります
exports.test = function(){
        server.io.emit("displayToClient","hoge");
        console.log("そーしんてすと");
}

exports.sendPlayerNumber = function(userId,playerNum){
    server.io.to(userId).emit("sendPlayerNum",playerNum);
}

//cardIdを投げる
exports.makeWindow = function(cardId,userId){
    server.io.to(userId).emit("makeWindow",cardId);
}

exports.startGame = function(roomId,data){
    server.io.to(roomId).emit("startGame",data);
}

exports.refreshHands = function(hand,userId){
    server.io.to(userId).emit("refreshHands",hand);
}

exports.selectCardFromHand = function(userId){
    server.io.to(userId).emit("selectCardFromHand");
}

exports.draw = function(userId,drawCards){
    server.io.to(userId).emit("draw",drawCards);
}

exports.drawPhase = function(userId,drawCards){
    server.io.to(userId).emit("draw",drawCards);
}

exports.changeSquare = function(roomId,cardId,squareNum){
    const data = [cardId,squareNum];
    console.log("changeSquare" + data);
    server.io.to(roomId).emit("changeSquare",data);
}

exports.updatePosition = function(roomId,playerNum,position){
    const data = [playerNum,position];
    console.log("upDatePosition" + data);
    server.io.to(roomId).emit("upDatePosition",data);
}

exports.dice = function(userId){
    server.io.to(userId).emit("dice");
}