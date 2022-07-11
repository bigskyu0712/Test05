/*******************************************************************
***  File Name      : DrawCard.js
***  Version        : V1.0
***  Designer       : 
***  Date           : 2022.06.28
***  Purpose        : ドローに関する処理
***
*******************************************************************/

class DrawCard extends THREE.Mesh {

    cardSize = 1.3;
    t=0;
    counter = 0;

    /****************************************************************************
    *** Method Name       　: constructor()
    *** Designer            : 
    *** Date                : 2022.6.28
    *** Function            : カードの生成
    *** Return              : なし
    ****************************************************************************/
    
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
    *** Method Name       　: draw()
    *** Designer            : 
    *** Date                : 2022.6.28
    *** Function            : ドローのアニメーション処理
    *** Return              : なし
    ****************************************************************************/

    draw(time){
            
            if(this.t <= 900){
                this.position.x = this.t * 0.6;
                this.position.z = this.t;
                this.t += 50;
            }else{
                this.counter += 1;
                if(this.counter==time){
                    this.counter = 0;
                    return 1;
                }else{
                    this.t = 0;
                    console.log(this.t);
                    this.position.set(0,21,5);
                    return 1;
                }
            }
            return 0;
    }

}