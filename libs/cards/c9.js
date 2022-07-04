/*******************************************************************
***  File Name          : c9.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 全員の手札のカードをすべて捨てる
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c9 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.everyoneDeleteAllCard(); //deleteAllCardを全員分行う
    }

    //全員が全てのカードを消去
    //board
    /*everyoneDeleteAllCard(){
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.deleteAllCard(this.players[i]);
        }
    }*/

}