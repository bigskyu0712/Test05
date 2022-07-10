/*******************************************************************
***  File Name          : c11.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 山札からカードを1枚選んで入手する
***
*******************************************************************/

const Card = require("./card.js");

module.exports = class c11 extends Card {

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
        this.board.effectSelectCardFromDeck(this.player, 1);
    }

/******************************************************************
*** Method Name         : afterEffect()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : クライアントから送信後データを受け取った後の処理
*** Return              : なし
******************************************************************/

    afterEffect(data){
        console.log("11");
        this.board.effectAddCard(this.player, data);
    }

/******************************************************************
*** Method Name         : addCard()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : カードIdからカードを入手
*** Return              : なし
******************************************************************/

    addCard(player, cardId){
        player.effectAddCard(this.player,cardId);
    }

}