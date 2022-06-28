
const Card = require("./card.js");

//カードの15番目，自分の順位の数だけさらに進む


module.exports = class c15 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
        //現在の順位も入れる？
    }

    //処理を記述
    effect(){
        //順位をどう計算するか
        //分からない
        board.rankMove(player);
    }

}