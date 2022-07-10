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
        if(this.board.item.length > 0){
            this.board.selectItemCard(player, 1, 1)
        }else{
            this.board.nonAction();
        }
    }

/******************************************************************
*** Method Name         : afterEffect()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : クライアントから送信後データを受け取った後の処理
*** Return              : なし
******************************************************************/

    afterEffect(data)   //sendData
    {
        if(this.board.item.length > 0){
            this.board.addItem(player, data.itemId);
        }
    }

}