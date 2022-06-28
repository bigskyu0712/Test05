
const Card = require("./card.js");

//カードの27番目，他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚選んで捨てる

module.exports = class c27 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,cardId) {
        super(board,player); //このplayerは指名された側
        this.cardId = cardId;
    }

    //処理を記述
    effect(){
        board.deleteCard(player, cardId); //c12と同じ
    }

}