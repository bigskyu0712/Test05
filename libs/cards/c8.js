
const Card = require("./card.js");

//�J�[�h��8�ԖځC�S���̎�D�̃J�[�h�����ꂼ��1�������_���Ɏ̂Ă�


module.exports = class c8 extends Card {

    //�J�[�h�^�C�v�ݒ�C
    static cardType = 1;

    //�R���X�g���N�^�C�K�v���Ȃ���΂�����Ȃ��đ��v�ł��D
    constructor(board) {
        this.board = board;
    }

    //�������L�q
    effect(){
        board.everyoneDeleteRandom(); //deleteRandom��S�����s��
    }

    //board
    everyoneDeleteRandom(){
        for (let i=0; i<players.length; ++i){
            this.deleteCardRandom(this.players[i]);
        }
    }

}