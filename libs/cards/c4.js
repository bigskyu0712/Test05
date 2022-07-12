/*******************************************************************
***  File Name          : c4.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 山札からカードを1枚ランダムに入手する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*/

const Card = require("./card.js");


module.exports = class c4 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Method              : playerとboardオブジェクトの設定
    *** Return              : なし
    ****************************************************************************/

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

    /******************************************************************
    *** Method Name         : effect()
    *** Designer            : 武田 和大
    *** Date                : 2022.07.02
    *** Method              : カードの効果を適応する
    *** Return              : なし
    ******************************************************************/

    effect(){
        this.board.addCardRandom(this.player); //addItemRandomを元に作る
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