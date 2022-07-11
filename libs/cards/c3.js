/*******************************************************************
***  File Name          : c3.js
***  Version            : V1.1
***  Designer           : 武田 和大
***  Date               : 2022.07.02
***  Purpose            : アイテムカードを1枚選んで入手する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.07.02
*** c1.1 : 曾根 悠太, 2022.07.04 effect, afterEffect
*/

const Card = require("./card.js");


module.exports = class c3 extends Card {

    //カードタイプ設定，
    static cardType = 1;
    
    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Method              : playerとboardオブジェクトの設定
    *** Return              : なし
    ****************************************************************************/

    //コンストラクタ，必要がなければいじらなくて大丈夫です．
    constructor(board,player) {
        super(board,player);
        this.isEffected = false;
    }

    /******************************************************************
    *** Method Name         : effect()
    *** Designer            : 武田 和大
    *** Date                : 2022.07.04
    *** Method              : カードの効果を適応する
    *** Return              : なし
    ******************************************************************/

    //処理を記述
    effect(){
        console.log(this.board.item.length);
        if(this.board.item.length > 0){
            this.board.effectSelectItem(this.player,1);
            this.isEffected = true;
        }else{
            this.board.nonAction(this.player);
            this.isEffected = false;
        }
    }
    
    
    /******************************************************************
    *** Method Name         : afterEffect()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Method              : クライアントから送信後データを受け取った後の処理
    *** Return              : なし
    ******************************************************************/

    //クライアントから送信後データを受け取った時
    afterEffect(data)   //sendData
    {
        if(this.board.item.length > 0){
            this.board.addItemNum(this.player, data);
        }
    }

}