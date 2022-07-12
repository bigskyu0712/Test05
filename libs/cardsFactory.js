/*******************************************************************
***  File Name          : cardsFactory.js
***  Version            : V1.1
***  Designer           : 曾根 悠太
***  Date               : 2022.07.04
***  Purpose            : カードを作成する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.06.21
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const reader = require('./cardsReader.js');

module.exports = class Cards{
    static create(cardId,board,player) {
        return new reader.cards[cardId](board,player);
    }
}