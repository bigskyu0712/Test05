/*******************************************************************
***  File Name          : c30.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 他のプレイヤー1人を指定し、そのプレイヤーと位置を入れ替える。
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c30 extends Card {

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
        console.log("30");
        this.board.changePosition(this.player, data.selectPlayer);
    }

    //位置を入れ替え
    //board
    /*changePosition(player, selectPlayer){
        let temp;
        temp = player.position;
        player.position = selectPlayer.position;
        selectPlayer.position = temp;
    }*/

}