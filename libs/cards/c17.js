
const Card = require("./card.js");

//カードの17番目，自分の前の番の人と位置を入れ替える

module.exports = class c17 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,turn) {
        this.board = board;
        this.turn = turn;
    }

    //処理を記述
    effect(){
        let previous = (turn + board.players.length - 1) % board.player.length
        //(turn + board.players.length - 1) % board.player.lengthで前の人
        board.changePosition(board.players[turn], board.players[previous]); //交換する2人を指定
    }

    //changePositionはc30


}