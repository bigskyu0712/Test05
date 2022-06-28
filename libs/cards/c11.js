
const Card = require("./card.js");
//c11.js
//カードの11番目，山札からカードを1枚選んで入手する


module.exports = class c11 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,cardId) {
        super(board,player);
        this.cardId = cardId;
    }

    //処理を記述
    effect(){
        board.addCard(player, cardId); 
    }

    //board
    addCard(player, cardId){
        player.addCard(cardId);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(){
        console.log("after");
    }

}