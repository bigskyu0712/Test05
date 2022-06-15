

//プレイヤーのクラス
module.exports = class Player
{
    constructor(name,userId){

        this.name = name;
        this.userId = userId;
        this.score = 0; //スコア
        this.hand = []; //手札
        this.item = []; //所持アイテム
        this.position = 0; //盤上での位置
    }


    //各ステータスを取得(一部使わないかも)
    getUsername(){
        return this.username;
    }

    getUserId(){
        return this.userid;
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

    addCard(cardId){
        this.hand.push(cardId);
    }

    addItem(itemId){
        this.item.push(itemId);
    }

    addScore(score){
        this.score += score;
    }

    updatePosition(diceRoll){
        this.position += diceRoll;
    }

    deleteCard(cardId){
        this.card = this.card.filter(function(value){
            return value != cardId;
        });
    }

    deleteItem(itemId){
        this.item = this.item.filter(function(value){
            return value != itemId;
        });
    }

    
}