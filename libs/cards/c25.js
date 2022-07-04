/*******************************************************************
***  File Name          : c25.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 他のプレイヤー1人を指定し、そのプレイヤーとカードを1枚ランダムに交換する
***
*******************************************************************/

const Card = require("./card.js");

module.exports = class c25 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        this.board.selectPlayer(this.player, 1);
    }
        
    afterEffect(data){
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