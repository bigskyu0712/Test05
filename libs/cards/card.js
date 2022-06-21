module.exports = class Card {

    static cardType = 0;

    constructor(board,player) {
        this.board = board;
        this.player = player;
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

    addRule(){

    }

}