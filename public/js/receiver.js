
/*******************************************************************
***  File Name		: receiver.js
***  Version        : V1.2
***  Designer	    : 曾根悠太
***  Date		    : 2022.07.10
***  Purpose        : クライアントから受信
***
*******************************************************************/
/*
*** Revision :
*** V1.0 : 曾根悠太, 2022.06.28
*** V1.1 : 曾根悠太, 2022.07.06 effectAddItem,effectDeleteItem,selectPlayerHand,selectPlayerItem追加
*** V1.2 : 曾根悠太, 2022.07.10 バグ修正
*/

//プレイヤーの名前を受け取った時
socket.on("sendPlayerNum",function(playerNum){
    console.log(playerNum);
    gameData.myPlayerNum = playerNum;
});

//ゲーム開始メッセージを受け取った時
socket.on("startGame",function(data){
    main();
    initcanvas();
    initGameHome();
    dialogueHide();
    updatePopover();
    console.log(data);
    gameData.playerName = data;
    if(isInited == false){
        init();
    }else{
        isClear = true;
    }
})

//ドローメッセージを受け取った時
socket.on("draw",function (drawCards){
    setTimeout(function(){
        console.log(drawCards);
        gameData.hand = gameData.hand.concat(drawCards);
        isUpdate = true;
        console.log("socket send");
        socket.emit("reply","drawed");
    },500);
    
});

//手札からカードを選ぶ
socket.on("selectCardFromHand",function (){
    console.log("select");
    isUpdate = true;
    isMyturn = true;
    initSendData();
    gameState = 2;
    drawTopText();
});

//マスにカードを置く
socket.on("changeSquare",function (data){
    console.log(data);
    createCard.push(data);
    gameState = 3;
});

//マスの位置を更新
socket.on("upDatePosition",function (data){
    console.log(data);
    gameData.positions[data[0]] = data[1];
    gameState = 9;
});

//手札を更新
socket.on("upDateHand",function (data){
    gameData.hand = data;
    socket.emit("reply","upDateHand");
});

//さいころをふる
socket.on("dice",function (data){
    diceNum = data;
    displayText("さいころを振ってください");
});

//さいころを投げる
socket.on("throw",function (data){
    diceNum = data;
    gameState = 7;
});

//何もしないを受け取った時
socket.on("noneAction",function (){
    if(isMyturn == true){
        console.log("noneaction");
        socket.emit("reply", "noneaction");
    }
});

//次の番の通知を受け取る
socket.on("nextTurn",function (turn){
    console.log("nextTurn");
    isMyturn = false;
    isUpdate = true;
    showTurn(turn);
});

//カード効果でアイテム追加
socket.on("effectAddItem",function(data){
    console.log("itemPlus"+data.item);
    gameData.item[data.user].push(data.item);
    if(isMyturn == true){
        console.log("effect");
        socket.emit("reply", "effect");
    }
});

//カード効果でアイテム削除
socket.on("deleteAllItem",function(data){
    console.log("deleteAllItem"+data.item);
    gameData.item[data] = [];
    if(isMyturn == true){
        console.log("effect");
        socket.emit("reply", "effect");
    }
});

//カード選択画面を表示
socket.on("displayUsingCard",function(data){
    console.log("displayUsingCard"+data.type);
    makeCardList(data.deck,data.type);
    displayText("カードを1枚選んでください");
});

//手札情報を更新
socket.on("changeHand",function(data){
    console.log("changeHand"+data.hand);
    gameData.playerHandNumber[data.user] = data.hand;
    isUpdate = true;
});

//プレイヤーの切断
socket.on("disconnectUser",function(data){
    gameData.playerHandNumber[data] = 0;
    gameData.item[data] = [];
});

//手札を全て捨てる
socket.on("deleteAllCard",function(data){
    gameData.playerHandNumber[data] = 0;
    if(gameData.myPlayerNum == data){
        gameData.hand = [];
    }
    isUpdate = true;
});

//結果表示
socket.on("showResult",function(data){
    gameData.score = data;
    socket.disconnect()
    showResult();
});

//相手の手札から選ぶ
socket.on("selectPlayerHand",function(){
    displayText("相手の手札から1枚選んでください"); 
    gameState = 20;
});

//ルール変更時
socket.on("changeRule",function(data){
  gameData.term = data;  
  gameState = 3;
});

//ドローメッセージ送信
socket.on("sendDraw",function(){
    socket.emit("reply","drawed");
});

//gameStateを変更
socket.on("changeState",function(data){
    gameState = data;
});

//アイテムから選ぶ
socket.on("selectPlayerItem",function(){
    displayText("相手のアイテムから1枚選んでください"); 
    gameState = 21;
});

//アイテムを消去
socket.on("effectDeleteItem", function(data){   
    console.log("itemPlus"+data.item);
    gameData.item[data.user].splice(data.item, 1);
});