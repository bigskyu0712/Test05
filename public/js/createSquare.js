/*******************************************************************
***  File Name		: createSquare.js
***  Version		: V1.0
***  Designer		: 曾根 悠太
***  Date			  : 2022.06.28
***  Purpose    : マスについての処理
***
*******************************************************************/


/******************************************************************
*** Function Name       : createSquare()
*** Designer            : 曾根 悠太
*** Date                : 2022.06.28
*** Function            : マスの作成
*** Return              : meshList
******************************************************************/

function createSquare(scene, //シーン
                      cubesize) //マスの大きさ
{
    let geometry = new THREE.BoxBufferGeometry(cubesize, 2, cubesize);

    const offset = cubesize + 10;

    // マウスとの交差を調べたいものは配列に格納する
    const meshList = [];
    for (let i = 0; i < 6; i++) {
        for(let j = 0; j < 6; j++) {
            const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            if((i < 5 && i > 0) && (j < 5 && j > 0)){
                continue;
            }

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = j * offset - offset * 2 - offset / 2;
            mesh.position.y = 0;
            mesh.position.z = i * offset - offset * 2 - offset / 2;
            scene.add(mesh);

            // 配列に保存
            meshList.push(mesh);
        }
    }

    return meshList;
}


/******************************************************************
*** Function Name       : onMouse()
*** Designer            : 曾根 悠太
*** Date                : 2022.06.28
*** Function            : マスのマウスオーバー処理
*** Return              : meshList
******************************************************************/

function onMouse(meshList,//マスの配列
                raycaster)//光線(交差判定用)
{
          // その光線とぶつかったオブジェクトを得る
          const intersects = raycaster.intersectObjects(meshList);

          meshList.map((mesh) => {
            // 交差しているオブジェクトが1つ以上存在し、
            // 交差しているオブジェクトの1番目(最前面)のものだったら
            if (intersects.length > 0 && mesh === intersects[0].object) {
              // 色を赤くする
              mesh.material.color.setHex(0xff0000);
            } else {
              // それ以外は元の色にする
              mesh.material.color.setHex(0xffffff);
            }
          });
}