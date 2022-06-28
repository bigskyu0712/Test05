
const Card = require("./card.js");

//カードの18番目，自分の後ろの番の人と位置を入れ替える

module.exports = class c18 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,turn) {
        this.board = board;
        this.turn = turn;
    }

    //処理を記述
    effect(){
        next = board.getNextUser(turn);
        board.changePosition(board.players[turn], board.players[next]); 
    }

    //changePositionはc30

}