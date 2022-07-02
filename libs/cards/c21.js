
const Card = require("./card.js");

//カードの21番目，もう1度サイコロを振り、出た目が奇数ならその分進み、偶数ならその分戻る

module.exports = class c21 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        //サイコロの出目はもらってる？
        //ここでサイコロ振る？

    }

}