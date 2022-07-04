/*******************************************************************
***  File Name          : c10.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 全員の手札のカードをすべて山札に戻し、1人3枚ずつランダムに配布する
***
*******************************************************************/

const Card = require("./card.js");

module.exports = class c10 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.everyoneDeleteAndAdd();
    }

    //全員が全てのカードを消去し、3枚手札に加える
    //board
    /*everyoneDeleteAndAdd(){
        this.everyoneDeleteAllCard();
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.draw(this.players[i], 3);
        }
    }*/

}