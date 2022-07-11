/*******************************************************************
***  File Name          : c7.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分のカードをすべて捨てる
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const Card = require("./card.js");


module.exports = class c7 extends Card {

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
        this.board.deleteAllCard(this.player); //deleteCardRandomを所持数分回す
    }

    //全てのカードを消去
    //board
    //変更
    /*deleteAllCard(player){
        let i, j=player.item.length;
        for (i=0; i<j; ++i){
            this.deleteCardRandom(player);
        }
    }*/

}