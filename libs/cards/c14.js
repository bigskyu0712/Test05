/*******************************************************************
***  File Name          : c14.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : 次のターンお休み
***
*******************************************************************/

const Card = require("./card.js");


module.exports = class c14 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

/******************************************************************
*** Method Name         : effect()
*** Designer            : 武田 和大
*** Date                : 2022.07.04
*** Method              : カードの効果を適応する
*** Return              : なし
******************************************************************/

    effect(){
        this.board.rest(this.player);
        this.board.nonAction(this.player);
    }

    afterEffect(){

    }

    //playerのコンストラクタの追加
    //rest = 0 ・・・ 0は行動できる, 1(0以外)は休み
    //↑了解です。playerのフィールドにstate(0:通常,1:休み,3:切断を追加しました。)

    //次のターンお休み
    //board
    /*rest(player){
        player.rest = 1;
    }*/


    //boardのgetNextUserについて
    //1回休みの処理に対応
    /*getNextUser(turn){
        let i, nextTurn;
        for (i=0; i<this.players.length + 1; ++i){
            nextTurn = (turn + 1) % this.players.length;
            if(this.players[nextTurn]==0){
                break;
            }
            this.players[nextTurn].rest = 0; //次は行動できる
            turn = nextTurn;
        }
        return nextTurn;

    }*/
}