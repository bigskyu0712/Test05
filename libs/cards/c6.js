
const Card = require("./card.js");

//�J�[�h��6�ԖځC�����̃A�C�e���J�[�h�����ׂĎ̂Ă�


module.exports = class c6 extends Card {

    //�J�[�h�^�C�v�ݒ�C
    static cardType = 1;

    //�R���X�g���N�^�C�K�v���Ȃ���΂�����Ȃ��đ��v�ł��D
    constructor(board,player) {
        super(board,player);
    }

    //�������L�q
    effect(){
        board.deleteAllItem(player); //deleteItemRandom������������
    }

    //board
    deleteAllItem(player){
        for (let i=0; i<player.item.length; ++i){
            this.deleteItemRandom(player);
        }
    }

}