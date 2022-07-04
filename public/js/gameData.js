let diceNum = 0;
let isMyturn = false;

let gameData = {
    myPlayerNum:-1,
    playerName:[],
    positions:[0,0,0,0],
    item:[[],[],[],[]],
    score:[[],[],[],[]],
    hand:[],
    playerHandNumber:[4,4,4,4],
    direction:[],
    square:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    score:[0,0,0,0],
    term:-1
}

let cardInfo = {
    type:"none",
    id:-1
};

let hoverCard = {
    playerNum:-1,
    cardNum:-1,
    type:"none"
}

let sendData = {
    cardNum:-1,
    position:-1,
    playerNum:-1,
    selectPlayer:-1,
    itemNum:-1,
    cardId:-1,
    itemId:-1
}

//デッキ一覧
let deck = [1,2,3,4,5,6,7,8,9];
//アイテム一覧
let item = [0,0,0,0,0];
//0...自分自身,1...左,2...中央,3...右
function setDirection(myplayerNum){
    switch(myplayerNum){
        case 0:
            gameData.direction = [0,1,2,3];
            break;
        case 1:
            gameData.direction = [3,0,1,2];
            break;
        case 2:
            gameData.direction = [2,3,0,1];
            break;
        case 3:
            gameData.direction = [1,2,3,0];
            break;
        default:
            break;

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

function initGameData(){
    diceNum = 0;
    isMyturn = false;

    gameData = {
        myPlayerNum:-1,
        playerName:[],
        positions:[0,0,0,0],
        item:[[],[],[],[]],
        score:[[],[],[],[]],
        hand:[],
        playerHandNumber:[4,4,4,4],
        direction:[],
        square:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        score:[0,0,0,0],
        term:-1
    }
}