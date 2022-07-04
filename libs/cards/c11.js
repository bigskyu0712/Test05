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
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        //山札からカードを選ぶ場合はどうするか
        //送ってくださったメソッド名をメモする前にzoom閉じてしまったため、名前違うかもしれないです。
        this.board.effectSelectCardFromDeck(this.player, 1);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){
        console.log("11");
        this.board.effectAddCard(this.player, data);
    }

    //カードIdからカードを入手
    //board
    addCard(player, cardId){
        player.effectAddCard(this.player,cardId);
    }

}