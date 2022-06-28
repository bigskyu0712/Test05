
const Card = require("./card.js");

//カードの28番目，他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚選んで奪う

module.exports = class c28 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,target,cardId) {
        super(board,player);
        this.target = target;
        this.cardId = cardId;
    }

    //処理を記述
    effect(){
        board.stealCard(player, target, cardId);
    }

    //board
    stealCard(player, target, cardId){
        target.deleteCard(cardId);
        player.addCard(cardId);
    }

}