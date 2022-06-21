const Player = require('./player.js');
const display = require('./display.js');
const server = require('./matching.js');
const cards = require('./cardsFactory.js');

SQUARENUM = 15;
//ボードクラス
//ゲームの詳細な処理をこちらに
module.exports = class Borad{


    //初期化
    constructor(roomId,userList,game) {
        this.game = game;
        this.roomId = roomId;
        this.deck = [];
        this.item = [];
        this.square = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.players = new Array();
        for(const player of userList){
            const newPlayer = new Player(player.userName, player.id)
            this.players.push(newPlayer);
        }
        console.log(this.players);
        console.log(this.roomId);
    }

    //デッキの初期化
    initdeck(){
        this.deck = [1,2];
    }

    initItem(){
        this.item = [1,2,3,4,5,6,7,8,9,10];
    }

    //idからplayerを取得
    getPlayer(playerId){
        this.players.find(player => player.getUserId() === playerId);
    }
    
    //アイテムを追加(Id指定)
    addItem(player, itemId){
        player.addItem(itemId);
    }

    //アイテムを追加(ランダム)
    addItemRandom(player){
        let rand = Math.floor(Math.random()*this.item.length);
        let temp = this.item[rand];
        this.item[rand] = this.item[this.item.length - 1]
        this.item[this.item.length - 1] = temp;
        player.addItem(item.pop());
    }

    //アイテムを消去(Id指定)
    deleteItem(player,itemId){
        player.deleteItem(itemId);
    }

    //アイテムを消去(ランダム)
    addItemRandom(player){
        let ItemId = player.getItem[Math.random()*player.getItem.length];
        player.deleteItem(ItemId);
    }

    //マスの変更(マスカードの設置等)
    changeSquare(cardId,position){
        this.square[position % SQUARENUM] = cardId;
    }


    //エクストラウィン
    extraWin(player){
        this.game.end(player);
    }

    changedRule(turn,cardId){
        
    }





    //ここから基本操作


    //最初のユーザ決め
    setFirstPlayers(){
        return Math.floor(Math.random() * (this.players.length));       
    }

    //ドロー
    draw(turn,received){
        if(received == 0){
            let rand = Math.floor(Math.random()*this.deck.length);
            let temp = this.deck[rand];
            this.deck[rand] = this.deck[this.deck.length - 1]
            this.deck[this.deck.length - 1] = temp;
            let topCard = this.deck.pop();
            console.log(topCard);
            this.players[turn].addCard(topCard[0]);
            display.draw(this.players[turn].getUserId());

            return 0;

        }else if(received == 1){

            return 0;
        }

        
    }

    //手札からカードを選択
    selectCard(turn,received,number){
        let card = 0;
        if(received == 0){
            console.log(this.players[turn].getHand());
            display.selectCardFromHand(this.players[turn].getUserId());
            return 0;

        }else if (received == 1){

            card = this.players[turn].getHand()[number];
            return card;

        }
        
    }

    selectSquare(turn,cardId,number){
        if(received == 0){
            display.selectSquare(this.players[turn].getUserId(),1,6);
            return 0;
        }
        else if (received == 1){
            this.changeSquare(cardId,this.players[turn].getPosition + number);
            return 0;
        }
    }



    //サイコロを振る
    dice(turn,received){
        if(received == 0){

            display.dice(this.players[turn].getId());

            return 0;

        } else if(received == 1){

            return Math.floor(Math.random() * 7);
        }

    }

    //コマを動かす
    move(turn,dice){
        if(received == 0){

           this.players[turn].updatePosition(dice);

        }else if(received == 1){

        }

        return 0;
    }

    action(turn){
        let cardId = this.players[turn].getPosition();
        let card = cards.create(cardId,this.players[turn]);
    }

    
    //次の手番のユーザを取得
    getNextUser(turn){
        return (turn + 1) % this.players.length;
    }




}