/*******************************************************************
***  File Name          : c8.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 全員の手札のカードをそれぞれ1枚ランダムに捨てる
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c8 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
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