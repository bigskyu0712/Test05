
const Card = require("./card.js");

//カードの22番目，もう1度サイコロを振り、出た目が奇数ならその分戻り、偶数ならその分進む



module.exports = class c22 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        //サイコロ振る
    }

}