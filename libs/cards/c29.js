/*******************************************************************
***  File Name          : c29.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分のカードをすべて捨てる
***
*******************************************************************/

//c7と同じ

const Card = require("./card.js");


module.exports = class c29 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.deleteAllCard(player); //deleteCardRandomを所持数分回す
    }


}