/*******************************************************************
***  File Name      : ItemCard.js
<<<<<<< HEAD
***  Version        : V1.1
***  Designer       : 曾根 悠太
=======
***  Version        : V1.0
***  Designer       : 曾根 悠太
>>>>>>> d87acba4ac194ea1f8837573f1c7fbe294734498
***  Date           : 2022.07.02
***  Purpose        : アイテムカードのオブジェクト
***
*******************************************************************/

/*
*** Revision :
<<<<<<< HEAD
*** V1.0 : 曾根 悠太, 2022.06.14
*** V1.1 : 曾根 悠太, 2022.07.02 場所を更新できるよう変更
=======
*** V1.0 : 曾根 悠太, 2022.06.14
*** V1.1 : 曾根 悠太, 2022.07.02 場所を更新できるよう変更
>>>>>>> d87acba4ac194ea1f8837573f1c7fbe294734498
*/


class ItemCard extends Card {

    cardSize = 1.3;
    itemId;
    t;
    
    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Function            : アイテムカードの位置を設定・更新する
    *** Return              : なし
    ****************************************************************************/
    constructor(path,   // カードのディレクトリ
                id)     // カードのID
    {
        super(path);

        this.t = 0;
        this.itemId = id;
    }

    /****************************************************************************
    *** Function Name       : setPosition()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Function            : アイテムカードの位置を設定・更新する
    *** Return              : なし
    ****************************************************************************/
    setPosition(playerNum,scene)  // ユーザの番号
    {
        console.log("Player direction:", gameData.direction[playerNum]);

        // カードが何番目か取得
        let index = gameData.item[playerNum].indexOf(this.itemId);
        if (index == -1) {
            scene.remove(this);
            this.geometry.dispose();
            return -1;
        }

        // プレイヤー位置によって座標を設定
        switch(gameData.direction[playerNum]){
            // 左側のユーザの場合
            case 1:
                this.position.x = -420;
                this.position.z = -165 + (index-1) * 110;

                this.rotation.y = Math.PI / 2 * -1;
                break;

            // 上側のユーザの場合
            case 2:
                this.position.x = 165 - (index-1) * 110;
                this.position.z = -420;
                
                this.rotation.y = Math.PI  * -1;
                break;

            // 右側のユーザの場合
            case 3:
                this.position.x = 420;
                this.position.z = 165 - (index-1) * 110;

                this.rotation.y = Math.PI / 2 * 1;
                break;
            
            // その他のユーザの場合
            default:
                this.position.x = 0;
                this.position.y = 2;
                this.position.z = 0;
                break;
        }

        return 0;



    }

    fall(){
        if(this.position.y > 3){
            card.position.y -= 10;
        }
    }

}