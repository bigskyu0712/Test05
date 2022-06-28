
const Card = require("./card.js");

//カードの5番目，自分の手札のカードを1枚ランダムに捨てる


module.exports = class c5 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.deleteCardRandom(player); //deleteItemRandomを元に作る
    }

    //board
    deleteCardRandom(player){
        let hand = player.getHand();
        let cardId = hand[Math.random() % hand.length];
        player.deleteCard(cardId);
    }

}