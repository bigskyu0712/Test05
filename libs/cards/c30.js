
const Card = require("./card.js");

//カードの30番目，他のプレイヤー1人を指定し、そのプレイヤーと位置を入れ替える。

module.exports = class c30 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,target) {
        super(board,player);
        this.target = target;
    }

    //処理を記述
    effect(){
        board.changePosition(player, target);
    }

    //board
    changePosition(player, target){
        let temp;
        temp = player.position;
        player.position = target.position;
        target.position = temp;
    }

}