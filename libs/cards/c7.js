
const Card = require("./card.js");

//�J�[�h��7�ԖځC�����̃J�[�h�����ׂĎ̂Ă�


module.exports = class c7 extends Card {

    //�J�[�h�^�C�v�ݒ�C
    static cardType = 1;

    //�R���X�g���N�^�C�K�v���Ȃ���΂�����Ȃ��đ��v�ł��D
    constructor(board,player) {
        super(board,player);
    }

    //�������L�q
    effect(){
        board.deleteAllCard(player); //deleteCardRandom������������
    }

    //board
    deleteAllCard(player){
        for (let i=0; i<player.hand.length; ++i){
            this.deleteCardRandom(player);
        }
    }

}