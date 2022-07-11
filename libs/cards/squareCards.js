/*******************************************************************
***  File Name          : squareCards.js
***  Version            : V1.0
***  Designer           : 曾根 悠太
***  Date               : 2022.07.04
***  Purpose            : boardとplyaerオブジェクトの設定をする
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.07.02
*/

module.exports = class squareCards {
    
    
    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Method              : boardとplyaerオブジェクトの設定
    *** Return              : なし
    ****************************************************************************/

    constructor(board,   //boardクラス
                userId)  //playerのId
    {
        this.board = board;
        this.player = this.board.getPlayer(userId);
    }

    
}