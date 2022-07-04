/*******************************************************************
***  File Name          : c24.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに奪う
***
*******************************************************************/

const Card = require("./card.js");

module.exports = class c24 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.selectPlayerHand(this.player);
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){//hoverCard
        this.board.stealCardRandom(this.player, data);

    }

    //ランダムにカードを奪う
    //board
    //変更
    /*stealCardRandom(player, selectPlayer){
        let CardId = selectPlayer.getHand()[Math.floor(Math.random()*selectPlayer.getHand().length)];
        this.deleteCard(selectPlayer, CardId)
        this.addCard(player, CardId);
    }*/

    //カードIdからカードを入手
    //board
    /*addCard(player, cardId){
        player.addCard(cardId);
    }*/


}