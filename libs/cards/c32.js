/*******************************************************************
***  File Name          : c32.js
***  Version            : V1.0
***  Designer           : 曾根 悠太
***  Date               : 2022.07.02
***  Purpose            : ルールカードの設定
***
*******************************************************************/

/*
*** Revision :
*** c1.0 : 曾根 悠太, 2022.07.04
*/

const Card = require("./card.js");

module.exports = class c32 extends Card {

    //カードタイプ設定，
    static cardType = 2;
    static term = [1,2];

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

/******************************************************************
*** Method Name         : effect()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.04
*** Method              : カードの効果を適応する
*** Return              : なし
******************************************************************/

    effect(){
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){//hoverCard


    }


}