
const Card = require("./card.js");

//カードの19番目，自分とランダムに選ばれたプレイヤーとの位置を入れ替える

module.exports = class c19 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        board.changPositioneRandom(player);
    }

    //board
    changPositioneRandom(player){
        
    }

}