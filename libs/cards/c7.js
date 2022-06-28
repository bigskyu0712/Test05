
const Card = require("./card.js");

//カードの7番目，自分のカードをすべて捨てる


module.exports = class c7 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.deleteAllCard(player); //deleteCardRandomを所持数分回す
    }

    //board
    deleteAllCard(player){
        for (let i=0; i<player.hand.length; ++i){
            this.deleteCardRandom(player);
        }
    }

}