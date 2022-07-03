/*******************************************************************
***  File Name          : c4.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 山札からカードを1枚ランダムに入手する
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c4 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.addCardRandom(player); //addItemRandomを元に作る
    }

    //ランダムにカードを入手
    //board
    /*addCardRandom(player){
        let rand = Math.floor(Math.random()*this.deck.length);
        let temp = this.deck[rand];
        this.deck[rand] = this.deck[this.deck.length - 1];
        this.deck[this.deck.length - 1] = temp;
        player.addCard(this.deck.pop()); 
    }*/


}