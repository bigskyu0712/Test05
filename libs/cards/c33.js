/*******************************************************************
***  File Name          : c33.js
***  Version            : V1.0
***  Designer           : 曾根 悠太
***  Date               : 2022.07.04
***  Purpose            : ルールカードの設定
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.07.04
*/

const Card = require("./card.js");

module.exports = class c33 extends Card {

    //カードタイプ設定，
    static cardType = 2;
    static term = [7,8];

    /****************************************************************************
    *** Method Name         : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
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
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Method              : カードの効果を適応する
    *** Return              : なし
    ******************************************************************/

    effect(){
    }

    /******************************************************************
    *** Method Name         : afterEffect()
    *** Designer            : 武田 和大
    *** Date                : 2022.07.04
    *** Method              : クライアントから送信後データを受け取った後の処理
    *** Return              : なし
    ******************************************************************/

    //クライアントから送信後データを受け取った時
    afterEffect(data)   //sendData
    {//hoverCard


    }


}