
const Card = require("./card.js");

//カードの23番目，他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに捨てる

module.exports = class c23 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player); //このプレイヤーは指名された側
    }

    //処理を記述
    effect(){
        board.deleteCardRandom(player); //c5と同じ
    }

}