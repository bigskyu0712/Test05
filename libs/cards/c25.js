
const Card = require("./card.js");

//カードの25番目，他のプレイヤー1人を指定し、そのプレイヤーとカードを1枚ランダムに交換する

module.exports = class c25 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,target) {
        super(board,player);
        this.target = target;
    }

    //処理を記述
    effect(){
        board.changeCardRandom(player, target);
        //乱数2つ設定
        //乱数1はtargetの手札のcardId
        //乱数2はplayerの手札のcardId
        //乱数1でplayerのdeleteCardとtargetのaddCard
        //乱数2でplayerのaddCardとtargetのdeleteCard
    }

}