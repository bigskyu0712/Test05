class Square extends THREE.Group{

    onMouseSquareNum;
    offset;
    cubesize;
    cardIdList = [];

    constructor(cubesize){
        
        super();
        this.meshList = [];
        this.cubesize = cubesize;
        let geometry = new THREE.BoxBufferGeometry(cubesize, 2, cubesize);
        this.offset = cubesize + 10;
        let nowX = 0;
        let nowZ = 0;
        for (let i = 0; i < 4; i++) {
            for(let j = 0; j < 5; j++) {
                const material = new THREE.MeshStandardMaterial({ color: 0x95d2ff });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = nowX * this.offset - this.offset * 2 - this.offset / 2;
                mesh.position.y = 0;
                mesh.position.z = nowZ * this.offset - this.offset * 2 - this.offset / 2;
                this.meshList.push(mesh);
                this.add(mesh);
                switch(i){
                  case 0:
                    nowX++;
                    break;
                  case 1:
                    nowZ++;
                    break;
                  case 2:
                    nowX--;
                    break;
                  case 3:
                    nowZ--;
                  default:
                    break;
                }
    

    

            }
        }
    }

    onMouse(raycaster){
                  // その光線とぶつかったオブジェクトを得る
                  const intersects = raycaster.intersectObjects(this.meshList);
                  let flag = 0;
                    this.meshList.map((mesh,index) => {
                    // 交差しているオブジェクトが1つ以上存在し、
                    // 交差しているオブジェクトの1番目(最前面)のものだったら
                    if (intersects.length > 0 && mesh === intersects[0].object) {
                      // 色を赤くする
                      mesh.material.color.setHex(0xff0000);
                      this.onMouseSquareNum = index;
                      flag = 1;
                    } else {
                      // それ以外は元の色にする
                      mesh.material.color.setHex(0x95d2ff);
                    }
                  });
                  if(flag == 0){
                    this.onMouseSquareNum = -1;
                  }
                 
                  return this.onMouseSquareNum;
    }

    getPosition(num){
      return this.meshList[num].position;
    }

    setId(num,id){
      this.cardIdList[num] = id;
      console.log(this.cardIdList);
    }

    getCardId(num){
      if(num > 0){
        return this.cardIdList[num];
      }else{
        return -1;
      }
    }

}