/*******************************************************************
***  File Name          : c12.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の手札からカードを1枚選んで捨てる
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*/

const Card = require("./card.js");


module.exports = class c12 extends Card {

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
        this.board.selectCardFromHand(this.player, 1);
    }

    /******************************************************************
    *** Method Name         : afterEffect()
    *** Designer            : 武田 和大
    *** Date                : 2022.07.02
    *** Method              : クライアントから送信後データを受け取った後の処理
    *** Return              : なし
    ******************************************************************/

    afterEffect(data)   //sendData
    {
        console.log("12");
        this.board.deleteCard(this.player, data.cardId);
    }

    //カードIdからカードを消去
    //board
    /*deleteCard(player, cardId){
        player.deleteCard(cardId);
    }*/

}