/*******************************************************************
***  File Name          : c22.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : もう1度サイコロを振り、出た目が奇数ならその分戻り、偶数ならその分進む
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c22 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        let dice = this.board.diceDueToCard(this.player);
        if(dice % 2 == 1){
            dice = -1 * dice;
        }
        this.board.moveDueToCard(this.player, dice);  

    }

}