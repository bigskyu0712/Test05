/*******************************************************************
***  File Name          : c26.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 他のプレイヤー1人を指定し、そのプレイヤーと手札のカードをすべて交換する
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c26 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.selectPlayer(this.player, 1);
    }

    afterEffect(data){
        console.log("26");
        board.changeAllcard(this.player, data.selectPlayer);
    }

    //全てのカードを交換
    //board
    //変更
    /*changeAllCard(player, selectPlayer){
        let temp = [];
        temp = player.hand;
        player.hand = selectPlayer.hand.splice(0, 0);
        selectPlayer.hand = temp.splice(0, 0);
    }*/
    
}