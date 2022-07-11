/*******************************************************************
***  File Name          : card.js
***  Version            : V1.0
***  Designer           : 曾根 悠太
***  Date               : 2022.07.02
***  Purpose            : c0~c33の親クラスを作成する
***
*******************************************************************/

/*
*** Revision :
*** c1.0 : 曾根 悠太, 2022.07.04
*/

const Display = require('../display');

module.exports = class Card {

    static cardType = 0;

    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        this.board = board;
        this.player = player;
        this.display = Display;
    }

    static getType(){
        if(this.cardType == 0){
            console.log("invalid cardType");
            return -1;
        }else{
            return this.cardType;
        }
    }

/******************************************************************
*** Method Name         : effect()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.02
*** Method              : カードの効果を適応する
*** Return              : なし
******************************************************************/

    effect(){

    }

/******************************************************************
*** Method Name         : afterEffect()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.02
*** Method              : クライアントから送信後データを受け取った後の処理
*** Return              : なし
******************************************************************/

    afterEffect(){
        
    }

/******************************************************************
*** Method Name         : addRulet()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.04
*** Method              : ルールを変更する
*** Return              : なし
******************************************************************/

    addRule(){

    }

}