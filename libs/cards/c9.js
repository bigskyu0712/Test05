
const Card = require("./card.js");

//カードの9番目，全員の手札のカードをすべて捨てる


module.exports = class c9 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board) {
        this.board = board;
    }

    //処理を記述
    effect(){
        board.everyoneDeleteAllCard(); //deleteAllCardを全員分行う
    }

    //board
    everyoneDeleteAllCard(){
        for (let i=0; i<players.length; ++i){
            this.deleteAllCard(this.players[i]);
        }
    }

}