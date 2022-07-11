/*******************************************************************
***  File Name          : c8.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 全員の手札のカードをそれぞれ1枚ランダムに捨てる
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const Card = require("./card.js");


module.exports = class c8 extends Card {

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
        this.board.everyoneDeleteRandom(); //deleteRandomを全員分行う
    }

    //全員がランダムにカードを消去
    //board
    /*everyoneDeleteRandom(){
        for (let i=0; i<this.players.length; ++i){
            this.deleteCardRandom(this.players[i]);
        }
    }*/

}