
const Card = require("./card.js");

//カードの16番目，自分が最下位の時、もう1度行動できる(ドローから)

module.exports = class c16 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
        //現在の順位も入れる？
    }

    //処理を記述
    effect(){
        //if(最下位ならば)
        //行動出来る
    }

}