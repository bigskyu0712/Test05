class ItemCard extends Card {

    cardSize = 1.3;
    cardId;
    t;
    
    constructor(path){
        super(path);

        this.t = 0;
    }

    setPosition(playerNum){
        let x,z;
        console.log(gameData.direction[playerNum]);
        switch(gameData.direction[playerNum]){
            case 1:
                z = -165 + gameData.item[playerNum].length * 110;
                x = -420;
                this.position.x = x;
                this.position.y = 2;
                this.position.z = z;
                this.rotation.y = Math.PI / 2 * -1;
                break;
            case 2:
                z = -420;
                x = 165 - gameData.item[playerNum].length * 110;
                this.position.x = x;
                this.position.y = 2;
                this.position.z = z;
                this.rotation.y = Math.PI  * -1;
                break;
            case 3:
                z = 165 - gameData.item[playerNum].length * 110;
                x = 420;
                this.position.x = x;
                this.position.y = 2;
                this.position.z = z;
                this.rotation.y = Math.PI / 2 * 1;
                break;
            default:
                this.position.x = 0;
                this.position.y = 0;
                this.position.z = 0;
        }
    }

}