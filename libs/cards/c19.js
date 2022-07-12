/*******************************************************************
***  File Name          : c19.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 自分とランダムに選ばれたプレイヤーとの位置を入れ替える
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*/

const Card = require("./card.js");


module.exports = class c19 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太 悠太
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
        this.board.changePositionRandom(this.player);
    }

    //ランダムに位置を入れ替え
    //board
    /*changePositionRandom(player){
        let Turn = this.getTurn();
        let target = Math.floor(Math.random()*this.players.length);
        if(Turn==target){
            target = (target + 1) % this.players.length;
        }
        this.changePosition(player, this.players[target]);
    }*/

}