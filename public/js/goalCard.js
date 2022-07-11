/*******************************************************************
***  File Name      : GoalCard.js
***  Version        : V1.0
***  Designer       : 曾根悠太
***  Date           : 2022.07.02
***  Purpose        : ゴールカードに関する処理
***
*******************************************************************/

class GoalCard extends THREE.Mesh {

    cardSize = 1.3;
    cardId;
    t;

    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根悠太
    *** Date                : 2022.7.2
    *** Function            : ゴールカードの生成
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