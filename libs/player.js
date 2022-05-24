

//プレイヤーのクラス
module.exports = class Player
{
    constructor(playerData){

        this.name = playerData.userName;
        this.id = playerData.id;
        this.score = 0; //スコア
        this.hand = []; //手札
        this.item = []; //所持アイテム
        this.position = 0; //盤上での位置
    }


    //各ステータスを取得(一部使わないかも)
    getUsername(){
        return this.username;
    }

    getId(){
        return this.id;
    }

    getScore(){
        return this.score;
    }

    getHand(){
        return this.hand;
    }

    getItem(){
        return this.item;
    }

    getPosition(){
        return this.position;
    }

    addCard(card){
        this.item.push(card);
    }

    updatePosition(dice){
        this.position += dice;
    }
}