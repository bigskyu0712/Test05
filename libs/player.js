/*******************************************************************
***  File Name		: player.js
***  Version      : V1.1
***  Designer	  : 曾根
***  Date		  : 2022.07.4
***  Purpose      : マッチングに関するサブルーチンをこちらに
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.06.21
*** v1.1 : 曾根 悠太, 2022.07.04
*/

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

/****************************************************************************
*** Function Name       : disconnct()
*** Designer            :　曾根
*** Date                : 2022.7.4
*** Function            : 切断時
*** Return              : data
****************************************************************************/
    disconnect(){
        this.state = 3;
        const data = {
            hand: this.hand,
            item: this.item,
        }
        return data;
    }

    //各ステータスを取得(一部使わないかも)
/****************************************************************************
*** Function Name       : getUserName()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : ユーザ名取得
*** Return              : name
****************************************************************************/
    getUserName(){
        return this.name;
    }
/****************************************************************************
*** Function Name       : getUserId()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : ユーザID取得
*** Return              : userId
****************************************************************************/
    getUserId(){
        return this.userId;
    }

/****************************************************************************
*** Function Name       : getUserNum()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 何番目のユーザか取得
*** Return              : number
****************************************************************************/

    getUserNum(){
        return this.number;
    }
/****************************************************************************
*** Function Name       : getScore()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : スコア取得
*** Return              : score
****************************************************************************/
    getScore(){
        return this.score;
    }
/****************************************************************************
*** Function Name       : getHand()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 手札の取得
*** Return              : hand
****************************************************************************/
    getHand(){
        return this.hand;
    }
/****************************************************************************
*** Function Name       : getItem()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : アイテムの取得
*** Return              : item
****************************************************************************/   
    getItem(){
        return this.item;
    }
/****************************************************************************
*** Function Name       : getPosition()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 位置の取得
*** Return              : position
****************************************************************************/
    getPosition(){
        return this.position;
    }
/****************************************************************************
*** Function Name       : addCard()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 手札にカードを増やす
*** Return              : hand.push(cardId)
****************************************************************************/
    addCard(cardId){
        this.hand.push(cardId);
    }
/****************************************************************************
*** Function Name       : addItem()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : アイテムを増やす
*** Return              : なし
****************************************************************************/
    addItem(itemId){
        this.item.push(itemId);
    }
/****************************************************************************
*** Function Name       : addScore()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : スコアを増やす
*** Return              : なし
****************************************************************************/
    addScore(score){
        this.score += score;
    }
/****************************************************************************
*** Function Name       : updateScore()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : スコアを更新
*** Return              : なし
****************************************************************************/
    updateScore(){
        this.score = 0;
        let sum = 0;
        this.item.forEach(function(itemId){
            console.log("item!!!" + itemScoreList.itemScore[itemId]);
            sum += itemScoreList.itemScore[itemId];
        });
        this.score = sum;
    }
/****************************************************************************
*** Function Name       : updatePosition()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : ポジションの更新
*** Return              : なし
****************************************************************************/
    updatePosition(dice){
        this.position += dice;
        this.position = this.position % 20;
    }
/****************************************************************************
*** Function Name       : deleteCard()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 手札からカードの削除
*** Return              : value
****************************************************************************/
    deleteCard(cardId){
        this.hand = this.hand.filter(function(value){
            return value != cardId;
        });
    }
/****************************************************************************
*** Function Name       : deleteCardNum()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 手札からカードの削除(順番で)
*** Return              : なし
****************************************************************************/
    deleteCardNum(cardNum){
       this.hand.splice(cardNum, 1);
        console.log(this.hand);
    }
/****************************************************************************
*** Function Name       : deleteItem()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : アイテムの削除
*** Return              : value
****************************************************************************/
    deleteItem(itemId){
        this.item.filter(function(value){
            return value != itemId;
        });
    }
/****************************************************************************
*** Function Name       : deleteItemNum()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : アイテム数の削除
*** Return              : data
****************************************************************************/
    deleteItemNum(itemNum){
        this.item.splice(itemNum, 1);
    }

/****************************************************************************
*** Function Name       : hasItem()
*** Designer            : 曾根
*** Date                : 2022.7.4
*** Function            : 所持アイテム
*** Return              : item.indexOf(id)
****************************************************************************/
    hasItem(id){
        return this.item.indexOf(id) > -1;
    }

    
}