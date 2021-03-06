/*******************************************************************
***  File Name		: canvas2d.js
***  Version		: V1.3
***  Designer		: 曾根 悠太
***  Date			: 2022.07.10
***  Purpose        : 画面の文字を表示する
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 武田和大, 2022.06.28
*** V1.1 : 曾根 悠太, 2022.06.30 drawNameをゲームに組みこみ
*** V1.2 : 曾根 悠太, 2022.07.03 drawNameのバグを修正
*** V1.3 : 曾根 悠太, 2022.07.10 drawNameの仕様変更
*/

window.addEventListener('DOMContentLoaded', initCanvas2d);

/******************************************************************
*** Function Name       : initCanvas2d()
*** Designer            : 武田 和大
*** Date                : 2022.06.28
*** Function            : 初期化
*** Return              : なし
******************************************************************/

function initCanvas2d(){
    //canvas2dの作成
    const canvas2d = document.querySelector('#canvas2d');
    if ( ! canvas2d || ! canvas2d.getContext ) {
        return false;
    }
    cvs = canvas2d.getContext('2d');
            
    //canvas2dの横幅
    w = canvas2d.width;
    h = canvas2d.height;
                    
    leftTextLength = 0;   //文字列の左側の長さ
    rightTextLength = 0;  //文字列の右側の長さ 色を変えるときに使用
    allTextLength = 0;    //文字列全体の長さ
            
    //上に表示する文字の設定
    cvs.textAlign = 'center';
    cvs.Baseline = 'center';
    cvs.font = '60px serif';
}

/******************************************************************
*** Function Name       : initCanvas()
*** Designer            : 武田 和大
*** Date                : 2022.06.28
*** Function            : 表示の初期化
*** Return              : なし
******************************************************************/

function initcanvas(){
    cvs.clearRect(0, 0, w, h);
}

/******************************************************************
*** Function Name       : clearTopText()
*** Designer            : 曾根 悠太
*** Date                : 2022.06.30
*** Function            : 表示の初期化
*** Return              : なし
******************************************************************/

function clearTopText() {
    cvs.clearRect(0, 0, w, 100); //上に表示してた文字を消す
}

/******************************************************************
*** Function Name       : displayText()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.03
*** Function            : 文字の表示
*** Return              : なし
******************************************************************/

function displayText(text)//文字
{
    clearTopText();
    cvs.fillStyle = 'white';
    cvs.fillText(text, w / 2, 80);
}


/******************************************************************
*** Function Name       : drawTopText()
*** Designer            : 曾根 悠太
*** Date                : 2022.06.30
*** Function            : 画面上部への文字の表示
*** Return              : なし
******************************************************************/

function drawTopText(){
    
    switch(gameState){
        case 2:
            clearTopText();
            leftTextLength = cvs.measureText("マスカード").width;
            rightTextLength = cvs.measureText("を置く場所を選んでください").width;
            allTextLength = cvs.measureText("マスカ－ドを置く場所を選んでください").width;
            cvs.fillStyle = 'orange';
            cvs.fillText("マスカード", w / 2 - allTextLength / 2 + leftTextLength / 2, 80);
            cvs.fillStyle = 'white';
            cvs.fillText("を置く場所を選んでください", w / 2 + allTextLength / 2 - rightTextLength / 2, 80);
            break;
        case 6:
            clearTopText();
            leftTextLength = cvs.measureText("さいころ").width;
            rightTextLength = cvs.measureText("を振ってください").width;
            allTextLength = cvs.measureText("さいころを振ってください").width;
            cvs.fillStyle = 'orange';
            cvs.fillText("さいころ", w / 2 - allTextLength / 2 + leftTextLength / 2, 80);
            cvs.fillStyle = 'white';
            cvs.fillText("を振ってください", w / 2 + allTextLength / 2 - rightTextLength / 2, 80);

        case 10:
            allTextLength = cvs.measureText("手札を1枚選んでください").width;
            cvs.fillStyle = 'white';
            cvs.fillText("手札を1枚選んでください", w / 2 + allTextLength / 2, 80);
        default:
            break;
    }


}


/******************************************************************
*** Function Name       : showTurn()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.10
*** Function            : 誰の番か表示
*** Return              : なし
******************************************************************/

function showTurn(userNum){
    clearTopText();
    leftTextLength = cvs.measureText(gameData.playerName[userNum]).width;
    rightTextLength = cvs.measureText("の番です").width;
    allTextLength = cvs.measureText(gameData.playerName[userNum] + "の番です").width;

    switch(userNum) {
        case 0:
            cvs.fillStyle = 'rgba(242,101,34,1)';
            break;
        case 1:
            cvs.fillStyle = 'rgba(255,222,23,1)';
            break;
        case 2:
            cvs.fillStyle = 'rgba(0,161,75,1)';
            break;
        case 3:
            cvs.fillStyle = 'rgba(33,64,154,1)';
            break;
        default:
            break;
    }

    cvs.fillText(gameData.playerName[userNum], w / 2 - allTextLength / 2 + leftTextLength / 2, 80);
    cvs.fillStyle = 'white';
    cvs.fillText("の番です", w / 2 + allTextLength / 2 - rightTextLength / 2, 80);

}

/******************************************************************
*** Function Name       : drawName()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.10
*** Function            : 画面の四隅に名前を表示
*** Return              : なし
******************************************************************/

function drawName() {

    let leftTextLength = 0;   //左側のユーザ名の長さ
    let rightTextLength = 0;  //右側のユーザ名の長さ
     /* 
    let player = gameData.playerName[gameData.myPlayerNum]; //仮置き
    let players = gameData.playerName; //仮置き
    let name = [];
    let j = 0;

    */

    cvs.textAlign = 'center';
    cvs.Baseline = 'center';
    cvs.font = '60px serif';

    for(i = 0;i <4; i++){

        switch(i){
            case 0:
                cvs.fillStyle = 'rgba(242,101,34,1)';
                break;
            case 1:
                cvs.fillStyle = 'rgba(255,222,23,1)';
                break;
            case 2:
                cvs.fillStyle = 'rgba(0,161,75,1)';
                break;
            case 3:
                cvs.fillStyle = 'rgba(33,64,154,1)';
                break;
            default:
                break;
        }
        switch(gameData.direction[i]){
            case 0:
                break;
            case 1:
                cvs.textAlign = 'left';
                leftTextLength = cvs.measureText(gameData.playerName[gameData.direction[i]]).width;
                cvs.fillText(gameData.playerName[i], 20, h / 2);
                break;
            case 2:
                cvs.textAlign = 'center';
                cvs.fillText(gameData.playerName[i], w/2, 150);
                break;
            case 3:
                cvs.textAlign = 'right'
                rightTextLength = cvs.measureText(gameData.playerName[gameData.direction[i]]).width;
                cvs.fillText(gameData.playerName[i], w - 20, h/2);
                break;
            default :
                break;

        }
        cvs.textAlign = 'center';

    }   


}