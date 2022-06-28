
const Card = require("./card.js");
//c13.js
//カードの13番目，全員がそれぞれの手札からカードを1枚選んで捨てる


module.exports = class c13 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,cardId) {
        super(board,player);
        this.cardId = cardId;
    }

    //処理を記述
    effect(){
        //全員の選択をどう受け取るか
        //誰がどのカードを選んだかの管理
        //分からない
        board.everyoneDeleteCard(player, cardId);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(){
        console.log("after");
    }

}