/*******************************************************************
***  File Name          : c25.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 他のプレイヤー1人を指定し、そのプレイヤーとカードを1枚ランダムに交換する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*/

const Card = require("./card.js");

module.exports = class c25 extends Card {

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
        this.board.selectPlayer(this.player, 1);
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
        console.log("25");
        this.board.changeCardRandom(this.player, data.selectPlayer);
    }

    //ランダムにカードを交換
    //board
    //変更
    /*changeCardRandom(player, selectPlayer){
        let CardId = player.getHand()[Math.floor(Math.random()*selectPlayer.getHand().length)];
        this.deleteCard(player, CardId);
        this.addCard(selectPlayer, CardId);
        CardId = selectPlayer.getHand()[Math.floor(Math.random()*selectPlayer.getHand().length)];
        this.deleteCard(selectPlayer, CardId);
        this.addCard(player, CardId);
    }*/
    
}