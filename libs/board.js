const Player = require('./player.js');
const display = require('./display.js');
const server = require('./matching.js');
const cards = require('./cardsFactory.js');
const reader = require('./cardsReader.js');


SQUARENUM = 20;
//ボードクラス
//ゲームの詳細な処理をこちらに
module.exports = class Board{


    //初期化
    constructor(roomId,userList,game) {
        this.game = game;
        this.roomId = roomId;
        this.deck = [];
        this.item = [];
        this.square = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.drawRule = 1;
        this.players = new Array();
        for(const player of userList){
            display.sendPlayerNumber(player.id,this.players.length);
            const newPlayer = new Player(player.userName, player.id,this.players.length,0)
            this.players.push(newPlayer);
        }
        this.diceMap = [];
        console.log(this.players);
        console.log(this.roomId);
    }

    disconnect(id) {
        const data = this.getPlayer(id).disconnect();
        this.deck = this.deck.concat(data.hand);
        this.item = this.item.concat(data.item);
        display.disconnect(this.roomId,this.getPlayer(id).getUserNum());
        return this.getPlayer(id).getUserNum();
    }

    //ルールの初期化
    initRule(){
        this.drawRule = 1;
    }

    //デッキの初期化
    initdeck(){
        this.deck = [2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,7,7,7,7,7,7,7,7,7,7,9,9,9,9,9,9,9,11,11,11,11,11,11,11,11];
        this.initItem();
    }

    initItem(){
        this.item = [1,2,3,4,5,6,7,8,9,10,11,12];
    }

    //idからplayerを取得
    getPlayer(playerId){
        return this.players.find(player => player.getUserId() === playerId);
    }
    
    //アイテムを追加(Id指定)
    addItem(player, itemId){
        player.addItem(itemId);
        
    }

    //アイテムを追加(ランダム)
    addItemRandom(player){
        let rand = Math.round(Math.random()*this.item.length);
        console.log("addItemRandom" + rand);
        const itemId = this.item.splice(rand,1)[0];
        player.addItem(itemId);
        display.effectAddItem(this.roomId,itemId,player.getUserNum());

    }

    //アイテムを消去(Id指定)
    deleteItem(player,itemId){
        player.deleteItem(itemId);
    }

    deleteHand(player,num){
        player.deleteCardNum(num);
        display.deleteCardFromHand(this.roomId,this.player.getUserNum());
    }

    //アイテムを消去(ランダム)
    deleteItemRandom(player){
        let ItemId = player.getItem[Math.random()*player.getItem.length];
        player.deleteItem(ItemId);
    }

    //マスの変更(マスカードの設置等)
    changeSquare(cardId,position){
        console.log("changeSquare");
        if(this.square[position % SQUARENUM] > 0){
            this.deck.push(this.square[position % SQUARENUM]);
        }
        this.square[position % SQUARENUM] = cardId;
        display.changeSquare(this.roomId,cardId,position);

    }

    //ドロー
    draw(player,count){
        let drawCards = [];
        for(i=0;i<count;i++){
            let rand = Math.floor(Math.random()*this.deck.length);
            let topCard = this.deck.splice(rand,1)[0];
            console.log(topCard);
            player.addCard(topCard);
            drawCards.push(topCard);
        }
        display.draw(player.getUserId(),drawCards);
    }

    selectPlayer(player,num){
        display.selectPlayer(player.getUserNum(),num);
    }

    selectCardFromHand(player,num){
        display.selectCardFromHand(player,num);
    }

    selectItemCard(player,num,option){
        display.selectItemCard(player,num,option);
    }

    effectDice(){
        this.diceNum = Math.floor(Math.random() * 7) + 1
        display.effectDice(this.players[turn].getUserId(),this.diceNum);
    }

    effectSelectCardFromDeck(player,num){
        display.displayUsingCard(player.getUserId(),this.deck,"card");
    }

    effectSelectItem(player,num){
        display.displayUsingCard(player.getUserId(),this.item,"item");
    }

    //エクストラウィン
    extraWin(player){
       
    }

    gameEnd(){
        let score = [];
        for(i = 0; i < 4; i++){
            this.players[i].updateScore()
            score.push(this.players[i].getScore());
        }
        display.showResult();
        this.game.end();
    }

    changedRule(turn,cardId){
        
    }


    nonAction(player){
        display.noneAction(player.getUserId());
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
            display.changeHand(this.roomId,this.players[turn].getUserNum(),this.players[turn].getHand().length);
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
                display.changeHand(this.roomId,this.players[turn].getUserNum(),this.players[turn].getHand().length);
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
            this.diceNum = Math.floor(Math.random() * 6) + 1;
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
    action(turn,received,data){
        console.log(this.square);
        if(received == 0){
            let cardId = this.square[this.players[turn].getPosition()];
            console.log("cardId=" + cardId);
            if(cardId != 0){
                let card = cards.create(cardId,this,this.players[turn]);
                card.effect();
                card = null;
                display.changeHand(this.roomId,this.players[turn].getUserNum(),this.players[turn].getHand().length);
            }else{
                display.noneAction(this.roomId);
                return 0;
            }
        }else if(received == 1){
            let cardId = this.square[this.players[turn].getPosition()];
            if(cardId != 0){
                let card = cards.create(cardId,this,this.players[turn]);
                card.afterEffect(data);
                card = null;
            }
            display.changeHand(this.roomId,this.players[turn].getUserNum(),this.players[turn].getHand().length);
            return 0;
        }

    }

    
    //次の手番のユーザを取得
    getNextUser(turn){
        let next = (turn + 1) % this.players.length;
        console.log("state=" + this.players[next].state);
        let i = 0;
        while(this.players[next].state > 0){
            i++;
            next = (turn + i) % this.players.length;
            if(this.players[next].state == 1){
                this.players[next].state = 0;
            }
        }
        display.getNextUser(this.roomId);
        
        return next;
    }








/*******************************************************************
***  File Name		: (addBoardMethod).js
***  Version      : V1.1
***  Designer		  : 武田和大
***  Date			    : 2022.06.30
***  Purpose      : boardのメソッドを追加
***
*******************************************************************/

    //c3
    effectAddItem(player, itemNum){
        player.addItem(this.item[itemNum]);
        this.item.splice(itemNum,1);
        console.log("item removed:"+this.item);
        display.effectAddItem(this.roomId,this.item[itemNum],player.getUserNum());
    }


    //c4
    //�����_���ɃJ�[�h�����
    addCardRandom(player){
        let rand = Math.floor(Math.random()*this.deck.length);
        let temp = this.deck[rand];
        this.deck[rand] = this.deck[this.deck.length - 1];
        this.deck[this.deck.length - 1] = temp;
        player.addCard(this.deck.pop()); 
    }

    //c5
    //�����_���ɃJ�[�h������
    deleteCardRandom(player){
        let Hand = player.getHand();
        let cardNum = Math.floor(Math.random()*Hand.length);
        player.deleteCardNum(cardNum);
        display.upDateHand(player.getUserId(), player.getHand());
    }

    //c6
    //�S�ẴA�C�e���J�[�h������
    deleteAllItem(player){
        let j = player.item.length;
        for (let i=0; i<j; ++i){
            this.deleteItemRandom(player);
        }
        console.log("player.hand="+ player.getItem());
        display.deleteAllItem(this.roomId,player.getUserNum());
    }

    //c7
    //�S�ẴJ�[�h������
    deleteAllCard(player){
        let j = player.hand.length;
        for (let i=0; i<j; ++i){
            this.deleteCardRandom(player);
        }
        display.upDateHand(player.getUserId(), player.getHand());
        display.changeHand(this.roomId,player.getUserNum(),player.getHand().length);
    }

    //c8
    //�S���������_���ɃJ�[�h������
    everyoneDeleteRandom(){
        for (let i=0; i<this.players.length; ++i){
            this.deleteCardRandom(this.players[i]);
        }
    }

    //c9
    //�S�����S�ẴJ�[�h������
    everyoneDeleteAllCard(){
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.deleteAllCard(this.players[i]);
        }
    }

    //c10
    //�S�����S�ẴJ�[�h���������A3����D�ɉ�����
    everyoneDeleteAndAdd(){
        this.everyoneDeleteAllCard();
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.draw(this.players[i], 3);
        }
    }

    //c11
    //�J�[�hId����J�[�h�����
    effectAddCard(player, cardNum){
        player.addCard(cardNum);
        this.deck.splice(cardNum,1);
        console.log("deck removed:"+this.deck);
        display.draw(player.getUserId(),cardNum);
    }

    //c12
    //�J�[�hId����J�[�h������
    deleteCard(player, cardId){
        player.deleteCard(cardId);
    }

    //c14
    //player�̃R���X�g���N�^�̒ǉ�
    //rest = 0 �E�E�E 0�͍s���ł���, 1(0�ȊO)�͋x��

    //board
    rest(player){
        player.rest = 1;
    }
    
    //board��getNextUser�ɂ���
    //1��x�݂ɑΉ�
    effectGetNextUser(turn){
        let i, nextTurn;
        for (i=0; i<this.players.length + 1; ++i){
            nextTurn = (turn + 1 + i) % this.players.length;
            if(this.players[nextTurn]==0){
                break;
            }
            this.players[nextTurn].rest = 0; //���͍s���ł���
        }
        return nextTurn;

    }

    //c15
    //���݂̏��ʂ��擾
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
    //���݂̃^�[�����擾
    getTurn(){
        return this.game.turn;
    }

    //c19
    //�����_���Ɉʒu�����ւ�
    changePositionRandom(player){
        let Turn = this.getTurn();
        let target = Math.floor(Math.random()*this.players.length);
        if(Turn==target){
            target = (target + 1) % this.players.length;
        }
        this.changePosition(player, this.players[target]);
    }

    //c20
    //�T�C�R����U��
    diceDueToCard(player){
        this.diceNum = Math.floor(Math.random() * 6) + 1;
        display.dice(player.getUserId(), this.diceNum);
    }

    //c20
    //�ʒu���X�V���A�R�}������
    moveDueToCard(player, dice){
        console.log("position=" + player.getPosition() + "dice=" + dice);
        player.updatePosition(dice);
        display.updatePosition(this.roomId, turn, player.getPosition());
        console.log("position=" + player.getPosition());
    }

    //c24
    //�����_���ɃJ�[�h��D��
    stealCardRandom(player, selectPlayer){
        let CardId = selectPlayer.getHand()[Math.random()*selectPlayer.getHand().length];
        this.deleteCard(selectPlayer, CardId)
        this.effectAddCard(player, CardId);
    }

    //c25
    //�����_���ɃJ�[�h������
    changeCardRandom(player, selectPlayer){
        let CardId = player.getCard[Math.random()*player.getCard.length];
        this.deleteCard(player, CardId);
        this.effectAddCard(selectPlayer, CardId);
        CardId = selectPlayer.getCard[Math.random()*selectPlayer.getCard.length];
        this.deleteCard(selectPlayer, CardId);
        this.effectAddCard(player, CardId);
    }

    //c26
    //�S�ẴJ�[�h������
    changeAllcard(player, selectPlayer){
        let temp = [];
        temp = player.hand;
        player.hand = selectPlayer.hand.splice(0, 0);
        selectPlayer.hand = temp.splice(0, 0);
    }

    //c28
    //1���J�[�h��D��
    stealCard(player, selectPlayer, cardId){
        selectPlayer.deleteCard(cardId);
        player.addCard(cardId);
    }

    //c29
    //2�l��1���̃J�[�h������
    changeCard(player, selectPlayer, myCardId, targetCardId){
        player.deleteCard(myCardId);
        selectPlayer.addCard(myCardId);
        selectPlayer.deleteCard(targetCardId);
        player.addCard(targetCardId);
    }

    //c30
    //�ʒu�����ւ�
    changePosition(player, selectPlayer){
        let temp;
        temp = player.position;
        player.position = selectPlayer.position;
        selectPlayer.position = temp;
    }

    //player��updatePosition
    //�}�C�i�X�ɂȂ������̑Ή�
    updatePosition(dice){
        this.position += dice;
        if(this.position<0){
            this.position += 20;
        }
    }
}