/*******************************************************************
***  File Name          : c31.js
***  Version            : V1.0
***  Designer           : 曾根 悠太
***  Date               : 2022.07.02
***  Purpose            : ゲームを終了する。
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.07.04
*/

const Card = require('./card.js');


module.exports = class c31 extends Card {

    //�J�[�h�^�C�v�ݒ�C
    static cardType = 1;

    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

/******************************************************************
*** Method Name         : effect()
*** Designer            : 曾根 悠太
*** Date                : 2022.07.04
*** Method              : カードの効果を適応する
*** Return              : なし
******************************************************************/

    effect(){
        this.board.gameEnd();
    }

   afterEffect(){

   }

}