/*******************************************************************
***  File Name    : card.js
***  Version      : V1.0
***  Designer     : 曾根悠太
***  Date         : 2022.06.28
***  Purpose      : カードの親クラス
***
*******************************************************************/

class Card extends THREE.Mesh {

    cardSize = 1.3;
    cardId;
    t;
    
    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根悠太
    *** Date                : 2022.6.28
    *** Function            : カードの設定
    *** Return              : なし
    ****************************************************************************/

    constructor(path){

        const geometry = new THREE.BoxBufferGeometry(1.3 * 63, 1, 1.3 * 88);


        //const material = new THREE.MeshNormalMaterial();

        const loader = new THREE.TextureLoader();
        const texture = loader.load(path);

        // マテリアルにテクスチャーを設定
        const material = new THREE.MeshStandardMaterial({
            map: texture
        });


        super(geometry, material);

        this.t = 0;
    }

}