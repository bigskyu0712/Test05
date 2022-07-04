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

    
    //ここからカードの効果処理に使うメソッドです
    //c4
    //ランダムにカードを入手
    addCardRandom(player){
        let rand = Math.floor(Math.random()*this.deck.length);
        let temp = this.deck[rand];
        this.deck[rand] = this.deck[this.deck.length - 1];
        this.deck[this.deck.length - 1] = temp;
        player.addCard(this.deck.pop()); 
    }

    //c5
    //ランダムにカードを消去
    deleteCardRandom(player){
        let Hand = player.getHand();
        let CardId = Hand[Math.floor(Math.random()*Hand.length)];
        player.deleteCard(CardId);
    }

    //c6
    //全てのアイテムカードを消去
    deleteAllItem(player){
        let i, j=player.item.length;
        for (i=0; i<j; ++i){
            this.deleteItemRandom(player);
        }
    }

    //c7
    //全てのカードを消去
    deleteAllCard(player){
        let i, j=player.item.length;
        for (i=0; i<j; ++i){
            this.deleteCardRandom(player);
        }
    }

    //c8
    //全員がランダムにカードを消去
    everyoneDeleteRandom(){
        for (let i=0; i<this.players.length; ++i){
            this.deleteCardRandom(this.players[i]);
        }
    }

    //c9
    //全員が全てのカードを消去
    everyoneDeleteAllCard(){
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.deleteAllCard(this.players[i]);
        }
    }

    //c10
    //全員が全てのカードを消去し、3枚手札に加える
    everyoneDeleteAndAdd(){
        this.everyoneDeleteAllCard();
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.draw(this.players[i], 3);
        }
    }

    //c12
    //カードIdからカードを消去
    deleteCard(player, cardId){
        player.deleteCard(cardId);
    }

    //c14
    rest(player){
        player.rest = 1;
    }

    //c15
    //現在の順位を取得
    getRank(player){
        let i, Turn, rank=1;
        Turn = this.getTurn();
        for (i=1; i<this.players.length; ++i){
            if(this.players[(Turn + i) % this.players.length].score > player.score){
                ++rank;
            }
        }
        return rank;
    }

    //c17
    //現在のターンを取得
    getTurn(){
        return this.game.turn;
    }

    //c19
    //ランダムに位置を入れ替え
    changePositionRandom(player){
        let Turn = this.getTurn();
        let target = Math.floor(Math.random()*this.players.length);
        if(Turn==target){
            target = (target + 1) % this.players.length;
        }
        this.changePosition(player, this.players[target]);
    }

    //c20
    //サイコロを振る
    diceDueToCard(player){
        this.diceNum = Math.floor(Math.random() * 6) + 1;
        display.dice(player.getUserId(), this.diceNum);
    }

    //c20
    //位置を更新し、コマが動く
    moveDueToCard(player, dice){
        console.log("position=" + player.getPosition() + "dice=" + dice);
        player.updatePosition(dice);
        display.updatePosition(this.roomId, turn, player.getPosition());
        console.log("position=" + player.getPosition());
    }

    //c24
    //ランダムにカードを奪う
    stealCardRandom(player, selectPlayer){
        let CardId = selectPlayer.getHand()[Math.floor(Math.random()*selectPlayer.getHand().length)];
        this.deleteCard(selectPlayer, CardId)
        this.addCard(player, CardId);
    }

    //c24
    //カードIdからカードを入手
    addCard(player, cardId){
        player.addCard(cardId);
    }

    //c25
    //ランダムにカードを交換
    changeCardRandom(player, selectPlayer){
        let CardId = player.getHand()[Math.floor(Math.random()*selectPlayer.getHand().length)];
        this.deleteCard(player, CardId);
        this.addCard(selectPlayer, CardId);
        CardId = selectPlayer.getHand()[Math.floor(Math.random()*selectPlayer.getHand().length)];
        this.deleteCard(selectPlayer, CardId);
        this.addCard(player, CardId);
    }

    //c26
    //全てのカードを交換
    changeAllCard(player, selectPlayer){
        let temp = [];
        temp = player.hand;
        player.hand = selectPlayer.hand.splice(0, 0);
        selectPlayer.hand = temp.splice(0, 0);
    }

    //c30
    //位置を入れ替え
    changePosition(player, selectPlayer){
        let temp;
        temp = player.position;
        player.position = selectPlayer.position;
        selectPlayer.position = temp;
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
            this.diceNum = Math.floor(Math.random() * 7) + 1
            display.dice(this.players[turn].getUserId(),this.diceNum);

            return 0;

        } else if(received == 1){

            return this.diceNum;
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
    //1回休みに対応
    getNextUser(turn){
        let i, nextTurn;
        for (i=0; i<this.players.length + 1; ++i){ //全員が1回休みになっていることを考慮して5回回す
            nextTurn = (turn + 1 + i) % this.players.length;
            if(this.players[nextTurn].rest==0){ //行動できる場合
                break;
            }
            this.players[nextTurn].rest = 0; //次は行動できる
        }
        return nextTurn;
    }




}