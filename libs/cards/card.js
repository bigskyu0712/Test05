const Display = require('../display');

module.exports = class Card {

    static cardType = 0;

    constructor(board,player) {
        this.board = board;
        this.player = player;
        this.display = Display;
    }

    static getType(){
        if(this.cardType == 0){
            console.log("invalid cardType");
            return -1;
        }else{
            return this.cardType;
        }
    }

    effect(){

    }

    afterEffect(){
        
    }

    addRule(){

    }

}