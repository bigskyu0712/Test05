const Player = require('./player.js');
const display = require('./display.js');
const server = require('./matching.js');
const cards = require('./cardsFactory.js');
const reader = require('./cardsReader.js');


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
        this.drawRule = 1;
        this.players = new Array();
        for(const player of userList){
            display.sendPlayerNumber(player.id,this.players.length);
            const newPlayer = new Player(player.userName, player.id)
            this.players.push(newPlayer);
        }
        console.log(this.players);
        console.log(this.roomId);
    }

    //ルールの初期化
    initRule(){
        this.drawRule = 1;
    }

    //デッキの初期化
    initdeck(){
        this.deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13];
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
    deleteItemRandom(player){
        let ItemId = player.getItem[Math.random()*player.getItem.length];
        player.deleteItem(ItemId);
    }

    //マスの変更(マスカードの設置等)
    changeSquare(cardId,position){
        console.log("changeSquare");
        this.square[position % SQUARENUM] = cardId;
        display.changeSquare(this.roomId,cardId,position);

    }

    //ドロー
    draw(player,count){
        let drawCards = [];
        for(i=0;i<count;i++){
            let rand = Math.floor(Math.random()*this.deck.length);
            let temp = this.deck[rand];
            this.deck[rand] = this.deck[this.deck.length - 1]
            this.deck[this.deck.length - 1] = temp;
            let topCard = this.deck.pop();
            console.log(topCard);
            player.addCard(topCard);
            drawCards.push(topCard);
        }
        display.draw(player.getUserId(),drawCards);
    }

    selectPlayer(player,num){
        display.selectPlayer(player,num);
    }

    selectCardFromHand(player,num){
        display.selectCardFromHand(player,num);
    }

    selectItemCard(player,num,option){
        display.selectItemCard(player,num,option);
    }

    //エクストラウィン
    extraWin(player){
        this.game.end(player);
    }

    changedRule(turn,cardId){
        
    }





    //ここから基本操作
    startGame(){
        display.startGame(this.roomId,[
            this.players[0].getUserName(),
            this.players[1].getUserName(),
            this.players[2].getUserName(),
            this.players[3].getUserName()
        ]);
    }

    //最初のユーザ決め
    setFirstPlayers(){
        return Math.floor(Math.random() * (this.players.length));  
    }

    //最初のドロー
    firstDraw(){
        for(let j=0;j<4;j++){
            console.log(this.players[j].getUserId());
            this.draw(this.players[j],4);
        }
              
    }

    //ドロー
    drawPhase(turn,received){
        if(received == 0){
            console.log(this.players[turn]);
            this.draw(this.players[turn],this.drawRule);

            return 0;

        }else if(received == 1){

            return 0;
        }

        
    }

    //手札からカードを選択
    selectCard(turn,received,data){
        let card = 0;
        if(received == 0){
            console.log(this.players[turn].getHand());
            display.selectCardFromHand(this.players[turn].getUserId());
            return 0;

        }else if (received == 1){
            if(data.cardNum <= this.players[turn].getHand().length - 1){
                card = this.players[turn].getHand()[data.cardNum];
                console.log(reader.cards[card]);
                this.players[turn].deleteCardNum(data.cardNum);
                if(reader.cards[card].cardType == 1){

                    //マス目を選択して変更
                    this.changeSquare(card,data.position);

                    //カードの種類がルールカードなら
                }else if(reader.cards[card].cardType == 2){

                    //ルールを変更
                    this.board.changedRule(card);

                }
            }else{
                console.log("err");
                card = this.players[turn].getHand()[0];
                return card;                
            }
        }
        
    }




    //サイコロを振る
    dice(turn,received){
        if(received == 0){

            display.dice(this.players[turn].getUserId());

            return 0;

        } else if(received == 1){

            return Math.floor(Math.random() * 7) + 1;
        }

    }

    //コマを動かす
    move(turn,dice,received){
        if(received == 0){
            console.log("position=" + this.players[turn].getPosition() + "dice=" + dice);
           this.players[turn].updatePosition(dice);
           display.updatePosition(this.roomId,turn,this.players[turn].getPosition());
           console.log("position=" + this.players[turn].getPosition());

        }else if(received == 1){

        }

        return 0;
    }

    //アクション
    action(turn,received){
        if(received == 0){
            let cardId = this.players[turn].getPosition();
            console.log(cardId);
            if(cardId != 0){
                let card = cards.create(cardId,this.players[turn]);
                card.effect();
                card = null;
            }else{
                return 0;
            }
        }else if(received == 1){
            let cardId = this.players[turn].getPosition();
            let card = cards.create(cardId,this.players[turn]);
            card.afterEffect(data);
            card = null;
        }

    }

    
    //次の手番のユーザを取得
    getNextUser(turn){
        return (turn + 1) % this.players.length;
    }




}