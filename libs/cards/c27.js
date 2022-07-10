/*******************************************************************
***  File Name          : c27.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の手札のカードを1枚ランダムに捨てる
***
*******************************************************************/

//c5と同じ

const Card = require("./card.js");


module.exports = class c27 extends Card {

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
        this.board.deleteCardRandom(player); //deleteItemRandomを元に作る
    }


}