/*******************************************************************
***  File Name      : HandCard.js
***  Version        : V1.0
***  Designer       : 曾根 悠太
***  Date           : 2022.07.02
***  Purpose        : 手札のオブジェクト
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 曾根 悠太, 2022.07.02
*/


class HandCard extends THREE.Mesh {

    cardSize = 1.3;
    itemId;
    t;
    
    constructor(){
        const geometry = new THREE.BoxBufferGeometry(1.3 * 63, 1, 1.3 * 88);


        //const material = new THREE.MeshNormalMaterial();

        const loader = new THREE.TextureLoader();
        const texture = loader.load('./img/cback.png');

        // マテリアルにテクスチャーを設定
        const material = new THREE.MeshStandardMaterial({
            map: texture
        });


        super(geometry, material);
    }//

    /****************************************************************************
    *** Function Name       : setPosition()
    *** Designer            : 
    *** Date                : 2022.7.2
    *** Function            : 手札の位置を設定・更新する
    *** Return              : なし
    ****************************************************************************/
    setPosition(playerNum,index){
        console.log("Player direction:", gameData.direction[playerNum]);
        this.position.y = 70;
        // プレイヤー位置によって座標を設定
        switch(gameData.direction[playerNum]){
            // 左側のユーザの場合
            case 1:
                this.position.x = -480;
                this.position.z = -165 + (index-1) * 110;

                this.rotation.z = Math.PI / 2 * -1;
                this.rotation.x = Math.PI / 2 * -1;
                break;

            // 上側のユーザの場合
            case 2:
                this.position.x = 165 - (index-1) * 110;
                this.position.z = -480;
                
                this.rotation.y = Math.PI  * -1;
                this.rotation.x = Math.PI / 2 * -1;
                break;

            // 右側のユーザの場合
            case 3:
                this.position.x = 480;
                this.position.z = 165 - (index-1) * 110;

                this.rotation.z = Math.PI / 2 * 1;
                this.rotation.x = Math.PI / 2 * -1;
                break;

            // その他のユーザの場合
            default:
                this.position.x = 0;
                this.position.y = 2;
                this.position.z = 0;
                break;
        }



    }

    fall(){
        if(this.position.y > 3){
            card.position.y -= 10;
        }
    }

}