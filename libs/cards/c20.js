/*******************************************************************
***  File Name          : c20.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : もう1度サイコロを振ることが出来る
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c20 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
    }

    //処理を記述
    effect(){
        //サイコロ振る処理
        let dice = this.board.diceDueToCard(this.player) 
        //進む処理
        this.board.moveDueToCard(this.player, dice);  
    }

    //サイコロを振る
    //board
    /*diceDueToCard(player){
        this.diceNum = Math.floor(Math.random() * 6) + 1;
        display.dice(player.getUserId(), this.diceNum);
    }*/

    //位置を更新し、コマが動く
    /*moveDueToCard(player, dice){
        console.log("position=" + player.getPosition() + "dice=" + dice);
        player.updatePosition(dice);
        display.updatePosition(this.roomId, turn, player.getPosition());
        console.log("position=" + player.getPosition());
    }*/

}