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
        let itemSum = 0; 
        for(i = 0;i < 4; i++){
            if(this.player.getUserNum == i){
                continue;
            }
            itemSum += this.board.players[i].item.length;
        }
        if(itemSum > 0){
            this.display.selectPlayerItem(this.player.getUserId());
        }else{
            this.board.nonAction(this.player);
        }
    }

    afterEffect(data){
        this.stealItem(this.player, data);
    }

    stealItem(player, data){
        let itemId = this.board.players[data.playerNum].getItem()[data.cardNum];
        this.board.players[data.playerNum].deleteItemNum(data.cardNum);
        player.addItem(itemId);
        this.display.effectAddItem(this.board.roomId,itemId,player.getUserNum());
        this.display.effectDeleteItem(this.board.roomId,data.cardNum,player.getUserNum());  
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