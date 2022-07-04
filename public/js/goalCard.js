class GoalCard extends THREE.Mesh {

    cardSize = 1.3;
    cardId;
    t;
    
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