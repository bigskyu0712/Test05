const itemScoreList = require('./itemScore.js')
 
//プレイヤーのクラス
module.exports = class Player
{
    constructor(name,userId,num,state){

        this.name = name;
        this.userId = userId;
        this.number = num;
        this.state = state;//0...接続中，1...一回休み...3...切断状態
        this.score = 0; //スコア
        this.hand = []; //手札
        this.item = []; //所持アイテム
        this.position = 0; //盤上での位置
    }

    //切断時
    disconnect(){
        this.state = 3;
        const data = {
            hand: this.hand,
            item: this.item,
        }
        return data;
    }

    //各ステータスを取得(一部使わないかも)
    getUserName(){
        return this.name;
    }

    //ユーザIdの取得
    getUserId(){
        return this.userId;
    }

    getUserNum(){
        return this.number;
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

    updateScore(){
        this.score = 0;
        let sum = 0;
        this.item.forEach(function(itemId){
            console.log("item!!!" + itemScoreList.itemScore[itemId]);
            sum += itemScoreList.itemScore[itemId];
        });
        this.score = sum;
    }

    //ポジションの更新
    updatePosition(dice){
        this.position += dice;
        this.position = this.position % 20;
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

    deleteItemNum(itemNum){
        this.item.splice(itemNum, 1);
    }


    hasItem(id){
        return this.item.indexOf(id) > -1;
    }

    
}