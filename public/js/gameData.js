diceNum = 0;
isMyturn = false;

gameData = {
    myPlayerNum:-1,
    playerName:[],
    positions:[0,0,0,0],
    item:[[],[],[],[]],
    score:[[],[],[],[]],
    hand:[],
    direction:[]
}

cardInfo = 0;

sendData = {
    cardNum:-1,
    position:-1,
    playerNum:-1,
    selectPlayer:-1,
    itemNum:-1,
    cardId:-1,
    itemId:-1
}

//0...自分自身,1...左,2...中央,3...右
function setDirection(myplayerNum){
    switch(myplayerNum){
        case 0:
            gameData.direction = [0,1,2,3];
        case 1:
            gameData.direction = [3,0,1,2];
        case 2:
            gameData.direction = [2,3,0,1];
        case 3:
            gameData.direction = [1,2,3,0];

    }
}

function initSendData() {
    sendData = {
        cardNum:-1,
        position:-1,
        playerNum:-1,
        selectPlayer:-1,
        itemNum:-1
    }
}