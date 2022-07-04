/*******************************************************************
***  File Name      : gameData.js
***  Version        : V1.1
***  Designer       : 曾根悠太
***  Date           : 2022.07.02
***  Purpose        : ゲームのデータを管理する
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 曾根悠太, 2022.06.14
*** V1.1 : ？, 2022.07.02
*/


diceNum = 0;
isMyturn = false;

// 現在進行中のゲームの情報
gameData = {
    // 
    myPlayerNum:-1,

    // 
    playerName:[],

    // 
    positions:[0,0,0,0],

    // 各プレイヤーの所持しているアイテムカード
    item:[[],[],[],[]],

    // 
    score:[[],[],[],[]],

    // 現在、手番のプレイヤーの手札
    hand:[],
<<<<<<< HEAD
    playerHandNumber:[4,4,4,4],
    direction:[],
    square:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    score:[0,0,0,0]
=======

    // 各プレイヤーの所持カード枚数
    playerHandNumber:[0,0,0,0],

    // 
    direction:[]
>>>>>>> 02f82b48e53301590e5acfc0d2e33fd3003cc035
}

cardInfo = 0;

hoverCard = {
    playerNum:-1,
    cardNum:-1
}

sendData = {
    // 
    cardNum:-1,

    // 
    position:-1,

    // 
    playerNum:-1,

    // 
    selectPlayer:-1,

    // 
    itemNum:-1,

    // 
    cardId:-1,

    // 
    itemId:-1
}

<<<<<<< HEAD
//デッキ一覧
deck = [1,2,3,4,5,6,7,8,9];
//アイテム一覧
item = [0,0,0,0,0];
//0...自分自身,1...左,2...中央,3...右
function setDirection(myplayerNum){
=======
/****************************************************************************
    *** Function Name       : setDirection()
    *** Designer            : 曾根悠太
    *** Date                : 2022.6.14
    *** Function            : 画面上に表示する情報の場所を設定する
    *** Return              : なし
****************************************************************************/
function setDirection(myplayerNum)  // 現在、手番のプレイヤーの番号
{
    /*
        0...自分自身
        1...左
        2...中央
        3...右
    */
>>>>>>> 02f82b48e53301590e5acfc0d2e33fd3003cc035
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
    *** Designer            : 曾根悠太
    *** Date                : 2022.6.14
    *** Function            : 送信する情報を初期化
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