/*******************************************************************
***  File Name          : c3.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : アイテムカードを1枚選んで入手する
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c3 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.effectSelectItem(this.player,1);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){
        console.log("3");
        this.board.addItemNum(this.player, data);
    }

}