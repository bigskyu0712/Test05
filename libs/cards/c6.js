/*******************************************************************
***  File Name          : c6.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分のアイテムカードをすべて捨てる
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c6 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        display.selectPlayerItem(this.player);
    }

    afterEffect(){
        
    }

    //全てのアイテムカードを消去
    //board 変更
    /*deleteAllItem(player){
        let i, j=player.item.length;
        for (i=0; i<j; ++i){
            this.deleteItemRandom(player);
        }
    }*/

}