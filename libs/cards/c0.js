
const Card = require("./card.js");
//c0.js
//カードの0番目，ダミーデータ兼書き方の見本となります。


module.exports = class c0 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        console.log("test");
    }

    //クライアントから送信後データを受け取った時
    afterEffect(){
        console.log("after");
    }

}