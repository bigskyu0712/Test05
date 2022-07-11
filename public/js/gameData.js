/*******************************************************************
***  File Name      : gameData.js
***  Version        : V1.2
***  Designer       : 曾根悠太
***  Date           : 2022.07.10
***  Purpose        : クライアントが保持するゲームデータについて
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 曾根悠太, 2022.06.30
*** V1.1 : 曾根悠太, 2022.07.02 cardInfo追加
*** V1.2 : 曾根悠太, 2022.07.03 direction,term追加
*/


let diceNum = 0;
let isMyturn = false;


//基本となるゲームデータです
let gameData = {
    myPlayerNum:-1, //自分のプレイヤー番号
    playerName:[], //自分の名前
    positions:[0,0,0,0], //各プレイヤーのコマの位置
    item:[[],[],[],[]], //各プレイヤーのアイテムリスト
    score:[[],[],[],[]], //各プレイヤーのスコア
    hand:[], //自分の手札データ
    playerHandNumber:[4,4,4,4], //各プレイヤーの手札の枚数
    direction:[], //各プレイヤーの向き
    square:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //各マスに置かれたカードId
    score:[0,0,0,0], //各プレイヤーのスコア
    term:-1 //勝利条件
}

let cardInfo = {
    type:"none", //"card"が入る
    id:-1 //カードId
};

let hoverCard = {
    playerNum:-1, //プレイヤー番号
    cardNum:-1, //カード番号
    type:"none" //1...アイテム，2...相手の手札
}

//サーバに送るデータ
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


    /****************************************************************************
    *** Function Name       : initSendData()
    *** Designer            : 
    *** Date                : 2022.6.30
    *** Function            : sendDataの初期化
    *** Return              : なし
    ****************************************************************************/

function initSendData() {
    sendData = {
        cardNum:-1,
        position:-1,
        playerNum:-1,
        selectPlayer:-1,
        itemNum:-1
    }
}


    /****************************************************************************
    *** Function Name       : initGameData()
    *** Designer            : 
    *** Date                : 2022.6.30
    *** Function            : gameDataの初期化
    *** Return              : なし
    ****************************************************************************/

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