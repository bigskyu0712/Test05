
const Card = require("./card.js");

//カードの29番目，他のプレイヤー1人を指定し、そのプレイヤーとカードを1枚選んで交換する

module.exports = class c29 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player,target, myCardId, targetCardId) {
        super(board,player);
        this.target = target;
        this.myCardId = myCardId;
        this.targetCardId = targetCardId;
    }

    //処理を記述
    effect(){
        board.changeCard(player, target, myCardId, targetCardId);
        //myCardIdによりplayerのdeleteCard, targetのaddCard
        //targetCardIdによりplayerのaddCard, targetのdeleteCard
    }

    //board
    changeCard(player, target, myCardId, targetCardId){
        player.deleteCard(myCardId);
        target.addCard(myCardId);
        target.deleteCard(targetCardId);
        player.addCard(targetCardId);
    }

}