const Player = require('./player.js');
const Action = require('./action.js');
const display = require('./display.js');
const server = require('./matching.js');
//ボードクラス
//ゲームの詳細な処理をこちらに
module.exports = class Borad{


    //初期化
    constructor(roomId,userList) {
        this.roomId = roomId;
        this.deck = [];
        this.card = new Action(this);
        this.players = new Array();
        for(const player of userList){
            const newPlayer = new Player(player.userName, player.id)
            this.players.push(newPlayer);
        }
        console.log(this.players);
        console.log(this.roomId);
    }

    //フィールド
    isTest = false;
    isDrawed = false;
    isSelectedCard = false;
    isDiced = false;
    isMoved = false;
    //主に自分に対する処理に対してのフィールド
    isProcessed = false;
    //複数人を巻き込む場合2人目以降を
    isPlayer2Processed = false;
    isPlayer3Processed = false;


    //デッキの初期化
    initdeck(){
        this.deck = [1,2,3];
    }

    //最初のユーザ決め
    setFirstPlayers(){
        return Math.floor(Math.random() * (this.players.length));       
    }

    //ドロー
    draw(turn){
        let topCard = this.deck.shift;
        console.log(topCard);
        this.players[turn].addCard(topCard);
        console.log(this.players);
    }

    //次の手番のユーザを取得
    getNextUser(turn){
        return (turn + 1) % this.players.length;
    }

    //手札からカードを選択
    selectCard(turn){
        this.players[turn].getCard();
    }

    //サイコロを振る
    dice(turn){
        return Math.floor(Math.random() * 7);
    }

    //コマを動かす
    move(turn,dice){
        this.players[turn].updatePosition(dice);
    }

    //アイテムを消去
    deleteItem(player,itemId){
        this.players[player].deleteItem(itemId);
    }




}