/*******************************************************************
***  File Name      : Dice.js
<<<<<<< HEAD
***  Version        : V1.1
***  Designer       : 曾根 悠太
***  Date           : 2022.07.02
=======
***  Version        : V1.0
***  Designer       : 曾根 悠太
***  Date           : 2022.06.28
>>>>>>> d87acba4ac194ea1f8837573f1c7fbe294734498
***  Purpose        : サイコロに関する
***
*******************************************************************/

/*
*** Revision :
<<<<<<< HEAD
*** V1.0 : 金森 嵩天, 2022.06.30
*** V1.1 : 曾根 悠太, 2022.07.02 場所を更新できるよう変更
=======
*** V1.0 : 金森嵩天, 2022.06.30
*** V1.1 : 曾根 悠太, 2022.07.02 場所を更新できるよう変更
>>>>>>> d87acba4ac194ea1f8837573f1c7fbe294734498
*/

class Dice extends THREE.Mesh{
    
    isThrown = false;
    num = 0;
    t = 0;
    isVisible = false;

    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Function            : アイテムカードの位置を設定・更新する
    *** Return              : なし
    ****************************************************************************/

    constructor(){
        const geometry = new THREE.BoxGeometry(200, 200, 200);

        // 画像を読み込む
        const loadPic = new THREE.TextureLoader();
        //マテリアルにテクスチャ貼り付け
        let material = [
            new THREE.MeshBasicMaterial({map: loadPic.load( './img/dice1.jpg' )}),//1
            new THREE.MeshBasicMaterial({map: loadPic.load( './img/dice2.jpg' )}),//2
            new THREE.MeshBasicMaterial({map: loadPic.load( './img/dice3.jpg' )}),//3
            new THREE.MeshBasicMaterial({map: loadPic.load( './img/dice5.jpg' )}),//4
            new THREE.MeshBasicMaterial({map: loadPic.load( './img/dice6.jpg' )}),//5
            new THREE.MeshBasicMaterial({map: loadPic.load( './img/dice4.jpg' )}) //6
        ];
        super(geometry, material);
    }

    /****************************************************************************
    *** Function Name       : rotate()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Function            : 待機アニメーションの設定
    *** Return              : なし
    ****************************************************************************/

    rotate(){
        this.rotation.x += 0.05;
        this.rotation.z += 0.1;
    }

    /****************************************************************************
    *** Method Name       : throw()
    *** Designer          : 曾根 悠太
    *** Date              : 2022.07.02
    *** Function          : 待機アニメーションの設定
    *** Return            : なし
    ****************************************************************************/


    throw(num){
        this.isThrown = true;
        this.t = 0;
        this.num = num;
    }


    /****************************************************************************
    *** Method Name       : dice()
    *** Designer          : 曾根 悠太
    *** Date              : 2022.07.02
    *** Function          : サイコロを振る時のアニメーション
    *** Return            : なし
    ****************************************************************************/

    dice(){
        if(this.t < 50){
            this.rotation.x += 0.3;
            this.rotation.z += 0.3;
            this.position.y = (100 * this.t - Math.pow(this.t,2))  + 200;
            this.t++;
        }else if(this.t == 50){
            console.log(this.num);
            //ここのnumはすごろくの目と対応していないので注意
            switch(this.num){
                case 1:
                    this.rotation.x = 0;
                    this.rotation.z = Math.PI / 2;
                    break;
                case 2:
                    this.rotation.x = 0;
                    this.rotation.z = Math.PI / 2 * 3;
                    break;
                case 3:
                    this.rotation.x = 0;
                    this.rotation.z = 0;
                    break;
                case 4:
                    this.rotation.x = Math.PI / 2;
                    this.rotation.z = 0;
                    break;
                case 5:
                    this.rotation.x = Math.PI;
                    this.rotation.z = 0;
                    break;
                case 6:
                    this.rotation.x = Math.PI / 2 * 3;
                    this.rotation.z = 0;
                    break;
                default:
                    this.rotation.x = 0;
                    this.rotation.z = 0;
                    break;
            }
            this.t++;
        }else if(this.t < 100){
            this.rotation.x += Math.PI * 10 / 125;
            this.rotation.z += Math.PI * 10 / 125;
            this.position.y = (100 * this.t - Math.pow(this.t,2))  + 200;
            this.t++;
        }else if(this.t <= 125){
            this.rotation.x += Math.PI * 10 / 125;
            this.rotation.z += Math.PI * 10 / 125;
            this.position.y = (50 * (this.t - 100) - Math.pow((this.t - 100),2))  + 200;
            this.t++; 
        }else if(this.t <= 150){
            this.rotation.x += Math.PI * 10 / 125;
            this.rotation.z += Math.PI * 10 / 125;
            this.position.y = (50 * (this.t - 100) - Math.pow((this.t - 100),2))  + 200;
            this.t++; 
        }else if(this.t <= 163){
            this.rotation.x += Math.PI * 10 / 125;
            this.rotation.z += Math.PI * 10 / 125;
            this.position.y = (26 * (this.t - 150) - Math.pow((this.t - 150),2))  + 200;
            this.t++; 
        }else if(this.t <= 175){
            this.rotation.x += Math.PI * 10 / 125;
            this.rotation.z += Math.PI * 10 / 125;
            this.position.y = (26 * (this.t - 150) - Math.pow((this.t - 150),2))  + 200;
            this.t++;
        }else if(this.t < 200){
            this.t++;
        }else if(this.t <= 250){
            this.rotation.x += Math.PI / 150;
            this.t++;
        }else if(this.t <= 300){
            this.t++;
        }
    }

    /****************************************************************************
    *** Method Name         : in()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Function            : サイコロの表示
    *** Return              : なし
    ****************************************************************************/

    in(){
        this.position.set(0,200,300);
        this.isVisible = true;
    }

    /****************************************************************************
    *** Method Name         : out()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.02
    *** Function            : サイコロの非表示
    *** Return              : なし
    ****************************************************************************/

    out(){
        this.position.z = 1100;
    }
}