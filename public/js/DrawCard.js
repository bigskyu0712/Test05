class DrawCard extends THREE.Mesh {

    cardSize = 1.3;
    t=0;
    counter = 0;
    
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

    draw(time){
            if(this.position.z <= 900){
                this.position.x = this.t * 0.6;
                this.position.z = this.t;
                this.t += 50;
            }else{
                this.counter++;
                if(this.counter==time){
                    return 1;
                }else{
                    this.t = 0;
                    this.position.set(0,21,5);
                    return 1;
                }
            }
            return 0;
    }
}