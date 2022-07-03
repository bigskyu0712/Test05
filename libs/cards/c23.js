/*******************************************************************
***  File Name          : c23.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに捨てる
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c23 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.selectPlayer(this.player, 1);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){
        console.log("23");
        this.board.deleteCardRandom(data.selectPlayer); //c5と同じ
    }

}