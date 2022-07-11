
socket.on("sendPlayerNum",function(playerNum){
    console.log(playerNum);
    gameData.myPlayerNum = playerNum;
});

socket.on("startGame",function(data){
    
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

socket.on("draw",function (drawCards){
    setTimeout(function(){
        console.log(drawCards);
        gameData.hand = gameData.hand.concat(drawCards);
        isUpdate = true;
        console.log("socket send");
        socket.emit("reply","drawed");
    },500);
    
});

socket.on("selectCardFromHand",function (){
    console.log("select");
    isUpdate = true;
    isMyturn = true;
    initSendData();
    gameState = 2;
    drawTopText();
});

socket.on("changeSquare",function (data){
    console.log(data);
    createCard.push(data);
    gameState = 3;
});

socket.on("upDatePosition",function (data){
    console.log(data);
    gameData.positions[data[0]] = data[1];
    gameState = 9;
});

socket.on("upDateHand",function (data){
    gameData.hand = data;
    socket.emit("reply","upDateHand");
});

socket.on("dice",function (data){
    diceNum = data;
    displayText("さいころを振ってください");
});

socket.on("throw",function (data){
    diceNum = data;
    gameState = 7;
});

socket.on("noneAction",function (){
    if(isMyturn == true){
        console.log("noneaction");
        socket.emit("reply", "noneaction");
    }
});

socket.on("nextTurn",function (turn){
    console.log("nextTurn");
    isMyturn = false;
    isUpdate = true;
    showTurn(turn);
});

socket.on("effectAddItem",function(data){
    console.log("itemPlus"+data.item);
    gameData.item[data.user].push(data.item);
    if(isMyturn == true){
        console.log("effect");
        socket.emit("reply", "effect");
    }
});

socket.on("deleteAllItem",function(data){
    console.log("deleteAllItem"+data.item);
    gameData.item[data] = [];
    if(isMyturn == true){
        console.log("effect");
        socket.emit("reply", "effect");
    }
});


socket.on("displayUsingCard",function(data){
    console.log("displayUsingCard"+data.type);
    makeCardList(data.deck,data.type);
    displayText("カードを1枚選んでください");
});

socket.on("changeHand",function(data){
    console.log("changeHand"+data.hand);
    gameData.playerHandNumber[data.user] = data.hand;
    isUpdate = true;
});

socket.on("disconnectUser",function(data){
    gameData.playerHandNumber[data] = 0;
    gameData.item[data] = [];
});

socket.on("deleteAllCard",function(data){
    gameData.playerHandNumber[data] = 0;
    if(gameData.myPlayerNum == data){
        gameData.hand = [];
    }
    isUpdate = true;
});

socket.on("showResult",function(data){
    gameData.score = data;
    socket.disconnect()
    showResult();
});

socket.on("selectPlayerHand",function(){
    displayText("相手の手札から1枚選んでください"); 
    gameState = 20;
});

socket.on("changeRule",function(data){
  gameData.term = data;  
  gameState = 3;
});

socket.on("sendDraw",function(){
    socket.emit("reply","drawed");
});

socket.on("changeState",function(data){
    gameState = data;
});

socket.on("selectPlayerItem",function(){
    displayText("相手のアイテムから1枚選んでください"); 
    gameState = 21;
});

socket.on("effectDeleteItem", function(){   
    console.log("itemPlus"+data.item);
    gameData.item[data.user].splice(data.item, 1);
});