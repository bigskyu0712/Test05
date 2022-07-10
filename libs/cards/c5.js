/*******************************************************************
***  File Name          : c5.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の手札のカードを1枚ランダムに捨てる
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c5 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

/******************************************************************
*** Method Name         : effect()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : カードの効果を適応する
*** Return              : なし
******************************************************************/

    effect(){
        this.board.deleteCardRandom(this.player); //deleteItemRandomを元に作る
    }

    //ランダムにカードを消去
    //board
    /*deleteCardRandom(player){
        let Hand = player.getHand();
        let CardId = Hand[Math.floor(Math.random()*Hand.length)]; //変更
        player.deleteCard(CardId);
    }*/

}