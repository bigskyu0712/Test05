/*******************************************************************
***  File Name          : c2.js
***  Version            : V1.0
***  Designer           : 曾根 悠太 悠太
***  Date               : 2022.07.02
***  Purpose            : アイテムの取得
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太 悠太, 2022.07.02
*/

const Card = require("./card.js");

//カードの2番目，アイテムの取得になります。


module.exports = class c2 extends Card {

    //カードタイプ設定，
    static cardType = 1;

    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太 悠太
    *** Date                : 2022.07.02
    *** Method              : playerとboardオブジェクトの設定
    *** Return              : なし
    ****************************************************************************/

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,   //boardクラス
                player)  //playerクラス
    {
        super(board,player);
    }

    /******************************************************************
    *** Method Name         : effect()
    *** Designer            : 曾根 悠太 悠太
    *** Date                : 2022.07.02
    *** Method              : カードの効果を適応する
    *** Return              : なし
    ******************************************************************/

    //処理を記述
    effect(){
        console.log(this.board.item.length);
        if(this.board.item.length > 0){
            this.board.addItemRandom(this.player);
        }else{
            this.board.nonAction(this.player);
        }
    }



}