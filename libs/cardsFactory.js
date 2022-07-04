const reader = require('./cardsReader.js');

module.exports = class Cards{
    static create(cardId,board,player) {
        return new reader.cards[cardId](board,player);
    }
}