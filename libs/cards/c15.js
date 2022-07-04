/*******************************************************************
***  File Name          : c15.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の順位の数だけさらに進む
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c15 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        let rank = this.board.getRank(this.player);
        this.board.moveDueToCard(this.player, rank);  
    }

    //現在の順位を取得
    //board
    /*getRank(player){
        let i, Turn, rank=1;
        Turn = this.getTurn();
        for (i=1; i<this.players.length; ++i){
            if(this.players[(Turn + i) % this.players.length].score > player.score){
                ++rank;
            }
        }
        return rank;
    }*/

}