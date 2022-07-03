/*******************************************************************
***  File Name          : c13.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : アイテムカードを1枚選んで入手する
***
*******************************************************************/

//c3と同じ

const Card = require("./card.js");


module.exports = class c13 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.selectItemCard(player, 1, 1)
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){
        console.log("3");
        this.board.addItem(player, data.itemId);
    }

}