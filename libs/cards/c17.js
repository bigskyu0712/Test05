/*******************************************************************
***  File Name          : c17.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分の前の番の人と位置を入れ替える
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c17 extends Card {

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
        let turn = this.board.getTurn();
        let previous = (turn + this.board.players.length - 1) % this.board.player.length
        //(turn + this.board.players.length - 1) % this.board.player.lengthで前の人
        this.board.changePosition(this.board.players[turn], this.board.players[previous]);
    }

    //現在のターンを取得
    //board
    /*getTurn(){
        return this.game.turn;
    }*/

    //changePositionはc30


}