

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
    getUserName(){
        return this.name;
    }

    //ユーザIdの取得
    getUserId(){
        return this.userId;
    }

    //スコアの取得
    getScore(){
        return this.score;
    }

    //手札の取得
    getHand(){
        return this.hand;
    }

    //アイテムの取得(配列)
    getItem(){
        return this.item;
    }

    //位置の取得
    getPosition(){
        return this.position;
    }

    //手札にカードを増やす
    addCard(cardId){
        this.hand.push(cardId);
    }

    //アイテムを増やす
    addItem(itemId){
        this.item.push(itemId);
    }

    //スコアを増やす
    addScore(score){
        this.score += score;
    }

    //ポジションの更新
    updatePosition(dice){
        this.position += dice;
    }

    //手札からカードの削除
    deleteCard(cardId){
        this.hand = this.hand.filter(function(value){
            return value != cardId;
        });
    }

    //手札からカードの削除(順番で)
    deleteCardNum(cardNum){
       this.hand.splice(cardNum, 1);
        console.log(this.hand);
    }

    //アイテムの削除
    deleteItem(itemId){
        this.item.filter(function(value){
            return value != itemId;
        });
    }

    
}