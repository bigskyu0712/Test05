/*******************************************************************
***  File Name          : display.js
***  Version            : V1.1
***  Designer           : 曾根 悠太
***  Date               : 2022.07.04
***  Purpose            : UIを更新すると送る
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.06.21
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const server = require('../server.js');

//UIのサーバ側処理
    
//テスト用になります
exports.test = function(){
        server.io.emit("displayToClient","hoge");
        console.log("そーしんてすと");
}

//  ユーザ番号を送る
exports.sendPlayerNumber = function(userId,playerNum){
    server.io.to(userId).emit("sendPlayerNum",playerNum);
}

//cardIdを投げる
exports.makeWindow = function(cardId,userId){
    server.io.to(userId).emit("makeWindow",cardId);
}

//  ゲームをスタートすると送る
exports.startGame = function(roomId,data){
    server.io.to(roomId).emit("startGame",data);
}

//  手札を更新すると送る
exports.refreshHands = function(hand,userId){
    server.io.to(userId).emit("refreshHands",hand);
}

//  手札からカードを選ぶと送る
exports.selectCardFromHand = function(userId){
    server.io.to(userId).emit("selectCardFromHand");
}

// カードを引くと送る
exports.draw = function(userId,drawCards){
    server.io.to(userId).emit("draw",drawCards);
}

// 
exports.drawPhase = function(userId,drawCards){
    server.io.to(userId).emit("draw",drawCards);
}

// マスを更新すると送る
exports.changeSquare = function(roomId,cardId,squareNum){
    let data = [cardId,squareNum];
    console.log("changeSquare" + data);
    server.io.to(roomId).emit("changeSquare",data);
    data = null;
}

// 位置を更新すると送る
exports.updatePosition = function(roomId,playerNum,position){
    let data = [playerNum,position];
    console.log("upDatePosition" + data);
    server.io.to(roomId).emit("upDatePosition",data);
    data = null;
}

// サイコロと送る
exports.dice = function(userId,data){
    //一回目の通信では0が送られる
    server.io.to(userId).emit("dice",data);
}

// 
exports.cardEffect = function(roomId,data){
    server.io.to(roomId).emit("cardData",data);
}

// 手番を飛ばすと送る
exports.noneAction = function(roomId){
    server.io.to(roomId).emit("noneAction");
}

// 次のユーザに進むと送る
exports.nextTurn = function(roomId,turn){
    console.log("nextTurn!!!");
    server.io.to(roomId).emit("nextTurn",turn);
}


// 
exports.effectTrash = function(userId){
    server.io.to(userId).emit("effectTrash");
}

// アイテムを追加すると送る
exports.effectAddItem = function(roomId,itemId,userNum){
    let data = {
         user:userNum, 
         item:itemId
        };
    server.io.to(roomId).emit("effectAddItem",data);
    data = null;
}

// アイテムを捨てると送る
exports.effectDeleteItem = function(roomId,itemNum,userNum){
    let data = {
        user:userNum, 
        item:itemNum
       };
   server.io.to(roomId).emit("effectDeleteItem",data);
   data = null;
}

// 手札からカードを捨てると送る
exports.deleteCardFromHand = function(roomId,userNum){
    server.io.to(roomId).emit("deleteCardFromHand",userNum);
}

// 全てのアイテムを捨てると送る
exports.deleteAllItem = function(roomId,userNum){
    server.io.to(roomId).emit("deleteAllItem",userNum);
}

// 利用しているカードを表示すると送る
exports.displayUsingCard = function(userId,deckdata,decktype){
    let data = {
        deck:deckdata,
        type:decktype,
    };
    server.io.to(userId).emit("displayUsingCard",data);
    data = null;
}

// 
exports.changeHand = function(roomId,userNum,handNum){
    let data = {
        user:userNum,
        hand:handNum
    };
    server.io.to(roomId).emit("changeHand",data);
    data = null;
}

// 
exports.effectDraw = function(userId,drawCards){
    server.io.to(userId).emit("effectDraw",drawCards);
}

// ユーザの切断すると送る
exports.disconnect = function(roomId,userNum){
    server.io.to(roomId).emit("disconnectUser",userNum);
}

// 手札を更新すると送る
exports.upDateHand = function(userId,hand){
    server.io.to(userId).emit("upDateHand",hand);
}

// 全てのカードを送ると送る
exports.deleteAllCard = function(roomId,userNum){
    server.io.to(roomId).emit("deleteAllCard",userNum)
}

// 結果を表示すると送る
exports.showResult = function(roomId,data){
    server.io.to(roomId).emit("showResult",data);
}

// 他のユーザの手札を選択すると送る
exports.selectPlayerHand = function(userId){
    server.io.to(userId).emit("selectPlayerHand");
}

// ルールを変更すると送る
exports.changeRule = function(roomId,cardId){
    server.io.to(roomId).emit("changeRule",cardId);
}

// 山札からカードを引くと送る
exports.sendDraw = function(userId){
    server.io.to(userId).emit("sendDraw");
}

// 状態を更新すると送る
exports.changeState = function(roomId,num){
    server.io.to(roomId).emit("changeState",num);
}

// 他のユーザのアイテムを選択すると送る
exports.selectPlayerItem = function(userId){
    server.io.to(userId).emit("selectPlayerItem");
}