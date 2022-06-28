
const Card = require("./card.js");

//カードの1番目，エクストラウィンになります。


module.exports = class c1 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        //board.extraWin(player);
        console.log("win");
    }



}