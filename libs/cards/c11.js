/*******************************************************************
***  File Name          : c11.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : アイテムカードを1枚ランダムに入手する
***
*******************************************************************/

//c2と同じ

const Card = require("./card.js");

module.exports = class c11 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.addItemRandom(player);
        console.log("2");
    }

}