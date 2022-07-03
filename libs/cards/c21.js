/*******************************************************************
***  File Name          : c21.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : もう1度サイコロを振り、出た目が奇数ならその分進み、偶数ならその分戻る
***
*******************************************************************/

const Card = require("./card.js");
//const display = require('../display.js');


module.exports = class c21 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        let dice = this.board.diceDueToCard(this.player);
        if(dice % 2 == 0){
            dice = -1 * dice;
        }
        this.board.moveDueToCard(this.player, dice); 

    }

}