const Card = require('./card.js');
//ゲーム終了カード


module.exports = class c31 extends Card {

    //�J�[�h�^�C�v�ݒ�C
    static cardType = 1;

    constructor(board,player) {
        super(board,player);
    }

    //�������L�q
    effect(){
        this.board.gameEnd();
    }
   afterEffect(){

   }

}