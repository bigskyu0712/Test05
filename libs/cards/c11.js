const Card = require('./card.js');
//�J�[�h��2�ԖځC�A�C�e���̎擾�ɂȂ�܂��B


module.exports = class c11 extends Card {

    //�J�[�h�^�C�v�ݒ�C
    static cardType = 1;

    //�R���X�g���N�^�C�K�v���Ȃ���΂�����Ȃ��đ��v�ł��D
    constructor(board,player) {
        super(board,player);
    }

    //�������L�q
    effect(){
        board.addItemRandom(player);
        console.log('11');
    }


}