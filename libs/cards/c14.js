
const Card = require("./card.js");

//カードの14番目，次のターンお休み


module.exports = class c14 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.rest(player);
    }

}