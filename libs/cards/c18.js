/*******************************************************************
***  File Name          : c18.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の後ろの番の人と位置を入れ替える
***
*******************************************************************/

const Card = require("./card.js");

module.exports = class c18 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        let turn = this.board.getTurn(); //c17
        let next = (turn + 1) % this.players.length;
        this.board.changePosition(this.board.players[turn], this.board.players[next]); 
    }

    //changePositionはc30

}