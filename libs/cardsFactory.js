const reader = require('./cardsReader.js');

module.exports = class Cards{
    static create(cardId){
        return new reader.cards[cardId]();
    }
}