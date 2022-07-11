/*******************************************************************
***  File Name          : c27.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の手札のカードを1枚ランダムに捨てる
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*/

//c5と同じ

const Card = require("./card.js");


module.exports = class c27 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Method              : playerとboardオブジェクトの設定
    *** Return              : なし
    ****************************************************************************/

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

    /******************************************************************
    *** Method Name         : effect()
    *** Designer            : 武田 和大
    *** Date                : 2022.07.02
    *** Method              : カードの効果を適応する
    *** Return              : なし
    ******************************************************************/

    effect(){
        this.board.deleteCardRandom(player); //deleteItemRandomを元に作る
    }


}