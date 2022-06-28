
const Card = require("./card.js");

//カードの6番目，自分のアイテムカードをすべて捨てる


module.exports = class c6 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.deleteAllItem(player); //deleteItemRandomを所持数分回す
    }

    //board
    deleteAllItem(player){
        for (let i=0; i<player.item.length; ++i){
            this.deleteItemRandom(player);
        }
    }

}