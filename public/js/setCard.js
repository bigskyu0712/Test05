function setCard(scene){
    let cardSize = 8;//63:88のまま倍率を変更
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./c2.png');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });

    let geometry = new THREE.BoxBufferGeometry(cardSize * 63, cardSize * 88, 5);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    scene.add(mesh);
}