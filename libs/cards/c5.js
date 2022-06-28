
const Card = require("./card.js");

//カードの2番目，アイテムの取得になります。


module.exports = class c5 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.addItemRandom(player);
        console.log("5");
    }



}