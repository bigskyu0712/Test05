
const Card = require("./card.js");

//カードの20番目，もう1度サイコロを振ることが出来る

module.exports = class c20 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        //サイコロ振る処理？と進む処理
    }

}