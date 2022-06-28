
const Card = require("./card.js");
//c3.js
//カードの3番目，アイテムカードを1枚選んで入手する


module.exports = class c3 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,itemId) {
        super(board,player);
        this.itemId = itemId;
    }

    //処理を記述
    effect(){
        board.addItem(player, itemId);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(){
        console.log("after");
    }

}