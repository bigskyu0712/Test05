
const Card = require("./card.js");

//カードの24番目，他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに奪う

module.exports = class c24 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,target) {
        super(board,player);
        this.target = target;
    }

    //処理を記述
    effect(){
        board.stealCardRandom(player, target); 
        //targetの手札のcardIdの乱数設定
        //targetはその乱数値でdeleteCard
        //playerはその乱数値でaddCard
    }

}