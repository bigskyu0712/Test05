/*******************************************************************
***  File Name          : squareCards.js
***  Version            : V1.0
***  Designer           : 曾根 悠太
***  Date               : 2022.07.02
***  Purpose            : 
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.07.04
*/

module.exports = class squareCards {
    
    constructor(board,   //boardクラス
                userId)  //playerのId
    {
        this.board = board;
        this.player = this.board.getPlayer(userId);
    }

    
}