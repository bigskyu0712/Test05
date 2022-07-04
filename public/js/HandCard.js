/*******************************************************************
***  File Name      : ItemCard.js
***  Version        : V1.0
***  Designer       : 
***  Date           : 2022.07.02
***  Purpose        : アイテムカードのオブジェクト
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 名前書いて, 2022.06.14
*** V1.1 : 名前書いて, 2022.07.02 場所を更新できるよう変更
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
    }

    /****************************************************************************
    *** Function Name       : setPosition()
    *** Designer            : 
    *** Date                : 2022.7.2
    *** Function            : アイテムカードの位置を設定・更新する
    *** Return              : なし
    ****************************************************************************/
    setPosition(playerNum,index){
        console.log("Player direction:", gameData.direction[playerNum]);

        // プレイヤー位置によって座標を設定
        switch(gameData.direction[playerNum]){
            case 1:
                this.position.x = -480;
                this.position.z = -165 + (index-1) * 110;

                this.rotation.z = Math.PI / 2 * -1;
                this.rotation.x = Math.PI / 2 * -1;
                break;
            case 2:
                this.position.x = 165 - (index-1) * 110;
                this.position.z = -480;
                
                this.rotation.y = Math.PI  * -1;
                this.rotation.x = Math.PI / 2 * -1;
                break;
            case 3:
                this.position.x = 480;
                this.position.z = 165 - (index-1) * 110;

                this.rotation.z = Math.PI / 2 * 1;
                this.rotation.x = Math.PI / 2 * -1;
                break;
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