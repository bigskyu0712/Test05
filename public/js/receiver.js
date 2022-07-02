
socket.on("sendPlayerNum",function(playerNum){
    console.log(playerNum);
    gameData.myPlayerNum = playerNum;
});

socket.on("startGame",function(data){
    console.log(data);
    gameData.playerName = data;
    init();
})

socket.on("draw",function (drawCards){
    console.log(drawCards);
    gameData.hand = gameData.hand.concat(drawCards);
});

socket.on("selectCardFromHand",function (){
    console.log("select");
    isMyturn = true;
    initSendData();
    gameState = 2;
    drawTopText();
});

socket.on("changeSquare",function (data){
    console.log(data);
    createCard = data;
    gameState = 3;
});

socket.on("upDatePosition",function (data){
    console.log(data);
    gameData.positions[data[0]] = data[1];
});

socket.on("dice",function (data){
    diceNum = data;
});