/*******************************************************************
***  File Name          : c3.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : アイテムカードを1枚選んで入手する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*** c1.1 : 曾根 悠太, 2022.07.04
*/

const Card = require("./card.js");


module.exports = class c3 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

/******************************************************************
*** Method Name         : effect()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : カードの効果を適応する
*** Return              : なし
******************************************************************/

    effect(){
        this.board.effectSelectItem(this.player,1);
    }

/******************************************************************
*** Method Name         : afterEffect()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : クライアントから送信後データを受け取った後の処理
*** Return              : なし
******************************************************************/

    afterEffect(data)   //sendData
    {
        console.log("3");
        this.board.addItemNum(this.player, data);
    }

}