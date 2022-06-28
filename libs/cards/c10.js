
const Card = require("./card.js");

//カードの10番目，全員の手札のカードをすべて山札に戻し、1人3枚ずつランダムに配布する

module.exports = class c10 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board) {
        this.board = board;
    }

    //処理を記述
    effect(){
        board.everyoneDeleteAllCard(); //c9と同じ
        //全員3枚もらう
        let i, j;
        for (i=0; i<board.players.length; ++i){
            for (j=0; j<3; ++j){
                board.addCardRandom(board.players[i]);
            }
        }
    }

}