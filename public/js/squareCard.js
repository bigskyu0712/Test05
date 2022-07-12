/*******************************************************************
***  File Name      : squareCard.js
***  Version        : V1.0
***  Designer       : 曾根 悠太 悠太
***  Date           : 2022.07.02
***  Purpose        : マスカードのオブジェクト
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 曾根 悠太 悠太, 2022.07.02
*/


class SquareCard extends Card {

    cardSize = 1.3;
    cardId;
    t;
    

    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根 悠太 悠太
    *** Date                : 2022.6.14
    *** Function            : アイテムカードの位置を設定・更新する
                              63 * 88 の 1.3倍のサイズの画像を読み込む
    *** Return              : なし
    ****************************************************************************/
    constructor(path)   // カード画像のファイルパス
    {
        super(path);

        this.t = 0;
    }

    /****************************************************************************
    *** Function Name       : setPosition()
    *** Designer            : 曾根 悠太 悠太
    *** Date                : 2022.7.2
    *** Function            : アイテムカードの位置を設定・更新する
    *** Return              : なし
    ****************************************************************************/
    setPosition(playerNum, index)  // ユーザの番号
    {
        console.log("Player direction:", gameData.direction[playerNum]);

        // プレイヤー位置によって座標を設定
        switch(gameData.direction[playerNum]){
            // 左側のユーザの場合
            case 1:
                this.position.x = -420 - (88*1.3 + 20);
                this.position.y = 2;
                this.position.z = -165 + (index * 110);

                this.rotation.y = Math.PI / 2 * -1;
                break;

            // 上側のユーザの場合
            case 2:
                this.position.x = 165 - (index * 110);
                this.position.y = 2;
                this.position.z = -420 - (88*1.3 + 20);
                
                this.rotation.y = Math.PI  * -1;
                break;

            // 右側のユーザの場合
            case 3:
                this.position.x = 420 + (88*1.3 + 20);
                this.position.y = 2;
                this.position.z = 165 - (index * 110);

                this.rotation.y = Math.PI / 2 * 1;
                break;

            // その他のユーザの場合
            default:
                this.position.x = 0;
                this.position.y = 0;
                this.position.z = 0;
                break;
        }

    }

}