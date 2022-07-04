
const Card = require("./card.js");

module.exports = class c32 extends Card {

    //カードタイプ設定，
    static cardType = 2;
    static term = [1,2];

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
    }

    //クライアントから送信後データを受け取った時
    afterEffect(data){//hoverCard


    }


}