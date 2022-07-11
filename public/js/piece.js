/*******************************************************************
***  File Name      : piece.js
***  Version        : V1.1
***  Designer       : 曾根悠太
***  Date           : 2022.07.02
***  Purpose        : コマに関する処理
***
*******************************************************************/


class Piece extends THREE.Sprite{

    now;
    isRun = 0;
    num = 0;

    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根悠太
    *** Date                : 2022.7.2
    *** Function            : 画像の読み込み
    *** Return              : なし
    ****************************************************************************/

    constructor(path,square,color){

        const material = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(path)
        });

        super(material);

        this.square = square;
        this.color = color;

    }

    /****************************************************************************
    *** Function Name       : moveTo()
    *** Designer            : 曾根悠太
    *** Date                : 2022.7.2
    *** Function            : 所定の位置までwalkToNextを行う
    *** Return              : なし
    ****************************************************************************/

    moveTo(num){
        if(num != this.num){
            this.num = num;
            this.position.x = this.square.getPosition(this.now).x;
            this.position.z = this.square.getPosition(this.now).z;
        }
        if(this.now == this.num){
            this.isRun = 0;
        }else{
            this.isRun = 1;
            this.walkToNext();
        }
    }


    /****************************************************************************
    *** Function Name       : setPosition()
    *** Designer            : 曾根悠太
    *** Date                : 2022.7.2
    *** Function            : 所定の位置までwalkToNextを行う
    *** Return              : なし
    ****************************************************************************/

    setPosition(positionList){
        if(this.isRun == 0){
            if(positionList[this.now] > 0){
                this.position.x = this.square.getPosition(this.now).x;
                this.position.z = this.square.getPosition(this.now).z;
                this.position.x -= this.square.cubesize / 4;
                this.position.z -= this.square.cubesize / 4;
                this.position.z += (this.square.cubesize / 2) * Math.floor((positionList[this.now] - 1) / 2);
                this.position.x += (this.square.cubesize / 2) * ((positionList[this.now] - 1) % 2);
                positionList[this.now] = positionList[this.now] + 1;
            }
        }
    }

    /****************************************************************************
    *** Function Name       : walkToNext()
    *** Designer            : 曾根悠太
    *** Date                : 2022.7.2
    *** Function            : 次のマスまで移動する
    *** Return              : なし
    ****************************************************************************/

    walkToNext(){
        let harf = 0;
        let vx = (this.square.getPosition((this.now + 1) % 20).x - this.square.getPosition(this.now).x) / 20;
        let vz = (this.square.getPosition((this.now + 1) % 20).z - this.square.getPosition(this.now).z) / 20;

        this.position.x += vx;
        this.position.z += vz;

        if(vx == 0){
            harf =this.square.getPosition(this.now).z + vz * 10;
            this.position.y = Math.sqrt(vz * vz  * 100- Math.pow(this.position.z - harf,2)) / 2 + 63;
        }else{
            harf = this.square.getPosition(this.now).x + vx * 10;
            this.position.y = Math.sqrt(vx * vx * 100- Math.pow(this.position.x - harf,2)) / 2 + 63;           
        }

        if(this.position.x == this.square.getPosition((this.now + 1) % 20).x && this.position.z == this.square.getPosition((this.now + 1) % 20).z){
            this.now = (this.now + 1) % 20;
        }
    }


}