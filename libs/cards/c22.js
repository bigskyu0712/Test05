/*******************************************************************
***  File Name          : c22.js
***  Version            : V1.1
***  Designer           : 武田 和大
***  Date               : 2022.07.04
***  Purpose            : もう1度サイコロを振り、出た目が奇数ならその分戻り、偶数ならその分進む
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const Card = require("./card.js");


module.exports = class c22 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太
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
    *** Date                : 2022.07.04
    *** Method              : カードの効果を適応する
    *** Return              : なし
    ******************************************************************/

    effect(){
        let dice = this.board.diceDueToCard(this.player);
        if(dice % 2 == 1){
            dice = -1 * dice;
        }
        this.board.moveDueToCard(this.player, dice);  

    }

}