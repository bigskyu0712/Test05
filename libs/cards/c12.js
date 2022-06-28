
const Card = require("./card.js");
//c12.js
//カードの12番目，自分の手札からカードを1枚選んで捨てる


module.exports = class c12 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,cardId) {
        super(board,player);
        this.cardId = cardId;
    }

    //処理を記述
    effect(){
        board.deleteCard(player, cardId); 
    }

    //board
    deleteCard(player, cardId){
        player.deleteCard(cardId);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(){
        console.log("after");
    }

}