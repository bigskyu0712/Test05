
const Card = require("./card.js");

//カードの26番目，他のプレイヤー1人を指定し、そのプレイヤーと手札のカードをすべて交換する

module.exports = class c26 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,target) {
        super(board,player);
        this.target = target;
    }

    //処理を記述
    effect(){
        board.changeAllCard(player, target);
        //何かに一時的にコピーして入れ替え？
    }

}