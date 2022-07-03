/*******************************************************************
***  File Name          : c12.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の手札からカードを1枚選んで捨てる
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c12 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.selectCardFromHand(this.player, 1);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){
        console.log("12");
        this.board.deleteCard(this.player, data.cardId);
    }

    //カードIdからカードを消去
    //board
    /*deleteCard(player, cardId){
        player.deleteCard(cardId);
    }*/

}