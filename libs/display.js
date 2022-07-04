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
    let data = [cardId,squareNum];
    console.log("changeSquare" + data);
    server.io.to(roomId).emit("changeSquare",data);
    data = null;
}

exports.updatePosition = function(roomId,playerNum,position){
    let data = [playerNum,position];
    console.log("upDatePosition" + data);
    server.io.to(roomId).emit("upDatePosition",data);
    data = null;
}

exports.dice = function(userId,data){
    //一回目の通信では0が送られる
    server.io.to(userId).emit("dice",data);
}

exports.cardEffect = function(roomId,data){
    server.io.to(roomId).emit("cardData",data);
}

exports.noneAction = function(roomId){
    server.io.to(roomId).emit("noneAction");
}

exports.getNextUser = function(roomId,userId){
    server.io.to(roomId).emit("nextTurn");
}

exports.effectTrash = function(userId){
    server.io.to(userId).emit("effectTrash");
}

exports.effectAddItem = function(roomId,itemId,userNum){
    let data = {
         user:userNum, 
         item:itemId
        };
    server.io.to(roomId).emit("effectAddItem",data);
    data = null;
}

exports.deleteCardFromHand = function(roomId,userNum){
    server.io.to(roomId).emit("deleteCardFromHand",userNum);
}


exports.deleteAllItem = function(roomId,userNum){
    server.io.to(roomId).emit("deleteAllItem",userNum);
}

exports.displayUsingCard = function(userId,deckdata,decktype){
    let data = {
        deck:deckdata,
        type:decktype,
    };
    server.io.to(userId).emit("displayUsingCard",data);
    data = null;
}

exports.changeHand = function(roomId,userNum,handNum){
    let data = {
        user:userNum,
        hand:handNum
    };
    server.io.to(roomId).emit("changeHand",data);
    data = null;
}

exports.effectDraw = function(userId,drawCards){
    server.io.to(userId).emit("effectDraw",drawCards);
}

exports.disconnect = function(roomId,userNum){
    server.io.to(roomId).emit("disconnectUser",userNum);
}

exports.upDateHand = function(userId,hand){
    server.io.to(userId).emit("upDateHand",hand);
}

exports.deleteAllCard = function(roomId,userNum){
    server.io.to(roomId).emit("deleteAllCard",userNum)
}

exports.showResult = function(roomId,data){
    server.io.to(roomId).emit("showResult",data);
}

exports.selectPlayerHand = function(userId){
    server.io.to(userId).emit("selectPlayerHand");
}

exports.changeRule = function(roomId,cardId){
    server.io.to(roomId).emit("changeRule",cardId);
}