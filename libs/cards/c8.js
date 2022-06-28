
const Card = require("./card.js");

//カードの8番目，全員の手札のカードをそれぞれ1枚ランダムに捨てる


module.exports = class c8 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board) {
        this.board = board;
    }

    //処理を記述
    effect(){
        board.everyoneDeleteRandom(); //deleteRandomを全員分行う
    }

    //board
    everyoneDeleteRandom(){
        for (let i=0; i<players.length; ++i){
            this.deleteCardRandom(this.players[i]);
        }
    }

}