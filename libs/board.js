/*******************************************************************
***  File Name          : board.js
***  Version            : V1.6
***  Designer           : 曾根悠太
***  Date               : 2022.07.10
***  Purpose            : ゲーム操作に関する各工程の記述
***
*******************************************************************/
/*
*** Revision :
*** v1.0 : 曾根悠太, 2022.05.17
*** v1.1 : 曾根悠太, 2022.06.03 仕様変更に伴い全モジュール変更
*** V1.2 : 曾根悠太, 2022.06.14 仕様変更に伴い全モジュール変更
*** V1.3 : 曾根悠太, 2022.06.28 各カード処理を行うためモジュール追加
*** V1.4 : 曾根悠太, 2022.07.04 受け入れテストへ向けて修正
*** V1.5 : 曾根悠太, 2022.07.10 バグ修正，drawPhase(),nextTurn()の修正
*/

const Player = require('./player.js');
const display = require('./display.js');
const server = require('./matching.js');
const cards = require('./cardsFactory.js');
const reader = require('./cardsReader.js');


SQUARENUM = 20;
//ボードクラス
//ゲームの詳細な処理をこちらに
module.exports = class Board{

    /****************************************************************************
    *** Function Name       : constructor()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : ボードの初期化
    *** Return              : なし
    ****************************************************************************/
    constructor(roomId,     // ルームのID
                userList,   // ユーザ一覧
                game)       // 現在のゲーム
    {
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
        this.winTerm = [0,0];
        console.log(this.players);
        console.log(this.roomId);
    }

    /****************************************************************************
    *** Function Name       : disconnect()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : ユーザの切断
    *** Return              : ゲーム内でのユーザの番号
    ****************************************************************************/
    disconnect(id) // ユーザのID
    {
        const data = this.getPlayer(id).disconnect();
        this.deck = this.deck.concat(data.hand);
        this.item = this.item.concat(data.item);
        display.disconnect(this.roomId,this.getPlayer(id).getUserNum());
        return this.getPlayer(id).getUserNum();
    }

    /****************************************************************************
    *** Function Name       : initRule()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : ユーザの切断
    *** Return              : なし
    ****************************************************************************/
    initRule(){
        this.drawRule = 1;
    }

    /****************************************************************************
    *** Function Name       : initdeck()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : デッキの初期化
    *** Return              : なし
    ****************************************************************************/
    //デッキの初期化
    initdeck(){
        this.deck = [2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,14,14,14,14,14,20,20,20,20,20,24,24,24,24,24,28,28,28,28,28,31,31,31,31,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38];

        this.initItem();
    }

    /****************************************************************************
    *** Function Name       : initItem()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : アイテムの初期化
    *** Return              : なし
    ****************************************************************************/
    initItem(){
        this.item = [1,2,3,4,5,6,7,8];
    }

    /****************************************************************************
    *** Function Name       : getPlayer()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : idからplayerを取得
    *** Return              : 入力されたIDのユーザ
    ****************************************************************************/
    getPlayer(playerId) // ユーザのID
    {
        return this.players.find(player => player.getUserId() === playerId);
    }
    
    /****************************************************************************
    *** Function Name       : addItem()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : アイテムを追加(ID指定)
    *** Return              : なし
    ****************************************************************************/
    addItem(player, // ユーザ
            itemId) // 追加するアイテムのID
    {
        player.addItem(itemId);
        display.effectAddItem(this.roomId,itemId,player.getUserNum());
        
    }

    /****************************************************************************
    *** Function Name       : addItemNum()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : アイテムを追加(アイテム番号指定)
    *** Return              : なし
    ****************************************************************************/
    addItemNum(player,  // ユーザ
               itemNum) // 追加するアイテムの番号
    {
        player.addItem(this.item[itemNum]);
        display.effectAddItem(this.roomId,this.item[itemNum],player.getUserNum());
        this.item.splice(itemNum,1);
    }

    /****************************************************************************
    *** Function Name       : addItemRandom()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : アイテムを追加(ランダム)
    *** Return              : なし
    ****************************************************************************/
    addItemRandom(player)   // ユーザ
    {
        let rand = Math.round(Math.random()*this.item.length);
        console.log("addItemRandom" + rand);
        const itemId = this.item.splice(rand,1)[0];
        player.addItem(itemId);
        display.effectAddItem(this.roomId,itemId,player.getUserNum());

    }

    /****************************************************************************
    *** Function Name       : deleteItem()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : アイテムを消去(Id指定)
    *** Return              : なし
    ****************************************************************************/
    deleteItem(player,  // ユーザ
               itemId)  // アイテムのID
    {
        player.deleteItem(itemId);
    }

    /****************************************************************************
    *** Function Name       : deleteHand()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : 指定した手札を削除
    *** Return              : なし
    ****************************************************************************/
    deleteHand(player,  // ユーザ
               num)     // 手札の番号
    {
        player.deleteCardNum(num);
        display.deleteCardFromHand(this.roomId,this.player.getUserNum());
    }

    /****************************************************************************
    *** Function Name       : deleteItemRandom()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : アイテムを消去(ランダム)
    *** Return              : なし
    ****************************************************************************/
    deleteItemRandom(player)    // ユーザ
    {
        let ItemId = player.getItem[Math.random()*player.getItem.length];
        player.deleteItem(ItemId);
    }

    /****************************************************************************
    *** Function Name       : changeSquare()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : マスの変更(マスカードの設置等)
    *** Return              : なし
    ****************************************************************************/
    changeSquare(cardId,    // カードのID
                 position)  // カードを設置する場所
    {
        console.log("changeSquare");
        if(this.square[position % SQUARENUM] > 0){
            this.deck.push(this.square[position % SQUARENUM]);
        }
        this.square[position % SQUARENUM] = cardId;
        display.changeSquare(this.roomId,cardId,position);

    }

    /****************************************************************************
    *** Function Name       : draw()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.14
    *** Function            : カードをドロー
    *** Return              : なし
    ****************************************************************************/
    draw(player,    // ユーザ
         count)     // カードを引く枚数
    {
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

    /****************************************************************************
    *** Function Name       : selectPlayer()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : ユーザを選択
    *** Return              : なし
    ****************************************************************************/
    selectPlayer(player,    // ユーザ
                　num)      // 選択したユーザの番号
    {
        display.selectPlayer(player.getUserNum(),num);
    }

    /****************************************************************************
    *** Function Name       : selectCardFromHand()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : 他のユーザからカードを選択
    *** Return              : なし
    ****************************************************************************/
    selectCardFromHand(player,  // ユーザ
                    　　num)     // 手札カードの番号
    {
        display.selectCardFromHand(player,num);
    }

    /****************************************************************************
    *** Function Name       : selectItemCard()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : アイテムカードを選択
    *** Return              : なし
    ****************************************************************************/
    selectItemCard(player,  // ユーザ
                    num,    // 番号
                    option) // オプション
    {
        display.selectItemCard(player,num,option);
    }

    /****************************************************************************
    *** Function Name       : effectSelectCardFromDeck()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : アイテムカードを選択
    *** Return              : なし
    ****************************************************************************/
    effectSelectCardFromDeck(player,    // ユーザ
                             num)       // 番号
    {
        display.displayUsingCard(player.getUserId(),this.deck,"card");
    }

    /****************************************************************************
    *** Function Name       : effectSelectItem()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : アイテムカードを選択
    *** Return              : なし
    ****************************************************************************/
    effectSelectItem(player,    // ユーザ
                     num)       // 番号
    {
        display.displayUsingCard(player.getUserId(),this.item,"item");
    }


    /****************************************************************************
    *** Function Name       : extraWin()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : エクストラウィン
    *** Return              : なし
    ****************************************************************************/
    extraWin(playerNum) // ユーザの番号
    {
        console.log("game end!!!!!");
        let score = [];
        for(i = 0; i < 4; i++){
            if(i == playerNum){
                score[i] = "Extra win";
                continue;
            }
            this.players[i].updateScore();
            score.push(this.players[i].getScore());
        }
        
        display.showResult(this.roomId,score);
    }

    /****************************************************************************
    *** Function Name       : gameEnd()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : ゲーム終了
    *** Return              : なし
    ****************************************************************************/
    gameEnd()
    {
        console.log("game end!!!!!");
        let score = [];
        for(i = 0; i < 4; i++){
            this.players[i].updateScore();
            score.push(this.players[i].getScore());
        }
        display.showResult(this.roomId,score);
    }

    /****************************************************************************
    *** Function Name       : changedRule()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : ルール変更
    *** Return              : なし
    ****************************************************************************/
    changedRule(term,       // ルールの内容
                cardId)     // カードのID
    {
        this.winTerm = term;
        display.changeRule(this.roomId,cardId);
    }

    /****************************************************************************
    *** Function Name       : nonAction()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 手番を飛ばす
    *** Return              : なし
    ****************************************************************************/
    nonAction(player)   // ユーザ
    {
        display.noneAction(player.getUserId());
    }

    /****************************************************************************
    *** Function Name       : changeState()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : ゲームの進行状況を変更
    *** Return              : なし
    ****************************************************************************/
    changeState(num)    // 状態の番号
    {
        display.changeState(this.roomId,num);
    }


    /****************************************************************************
    *** Function Name       : startGame()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.06.28
    *** Function            : ゲームをスタート
    *** Return              : なし
    ****************************************************************************/
    startGame()
    {
        display.startGame(this.roomId,[
            this.players[0].getUserName(),
            this.players[1].getUserName(),
            this.players[2].getUserName(),
            this.players[3].getUserName()
        ]);
    }

    /****************************************************************************
    *** Function Name       : setFirstPlayers()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 最初のユーザを設定
    *** Return              : なし
    ****************************************************************************/
    setFirstPlayers()
    {
        return Math.floor(Math.random() * (this.players.length));  
    }

    /****************************************************************************
    *** Function Name       : firstDraw()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 最初のドロー
    *** Return              : なし
    ****************************************************************************/
    firstDraw()
    {
        for(let j=0;j<4;j++){
            console.log(this.players[j].getUserId());
            this.draw(this.players[j],4);
        }    
    }

    /****************************************************************************
    *** Function Name       : addCard()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : カードを追加
    *** Return              : なし
    ****************************************************************************/
    addCard(player, // ユーザ
            cardId) // カードの番号
    {
        player.addCard(cardId);
    }

    /****************************************************************************
    *** Function Name       : drawPhase()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : ドローするフェーズに移行
    *** Return              : 0
    ****************************************************************************/
    drawPhase(turn,     // 手番
              received) //ユーザからの返答
    {
        if(received == 0){
            console.log(this.players[turn]);
            display.nextTurn(this.roomId,turn);
            this.draw(this.players[turn],this.drawRule);
            return 0;
        }else if(received == 1){
            display.changeHand(this.roomId,this.players[turn].getUserNum(),this.players[turn].getHand().length);
            return 0;
        }
        
    }

    /****************************************************************************
    *** Function Name       : selectCard()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 手札からカードを選択
    *** Return              : 0
    ****************************************************************************/
    selectCard(turn,        // 手番
               received,    // ユーザからの返答
               data)        // データ
    {
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
                    this.changedRule(reader.cards[card].term,card);

                }
            }else{
                console.log("err");
                card = this.players[turn].getHand()[0];
                
                return card;                
            }
        }
        
    }


    /****************************************************************************
    *** Function Name       : dice()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : サイコロを振る
    *** Return              : 0
    ****************************************************************************/
    dice(turn,      // 手番
         received)  // ユーザからの返答
    {
        if(received == 0){
            this.diceNum = Math.floor(Math.random() * 6) + 1;
            display.dice(this.players[turn].getUserId(),this.diceNum);

            return 0;

        } else if(received == 1){
            
            return this.diceNum;
        }

    }

    /****************************************************************************
    *** Function Name       : move()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : コマを動かす
    *** Return              : 0
    ****************************************************************************/
    move(turn,      // 手番
         dice,      // サイコロ
         received)  //　ユーザからの返答
    {
        if(received == 0){
            console.log("position=" + this.players[turn].getPosition() + "dice=" + dice);
           this.players[turn].updatePosition(dice);
           display.updatePosition(this.roomId,turn,this.players[turn].getPosition());
           console.log("position=" + this.players[turn].getPosition());

        }else if(received == 1){

        }

        return 0;
    }

    /****************************************************************************
    *** Function Name       : action()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 踏んだマスのアクション
    *** Return              : 0
    ****************************************************************************/
    action(turn,        // 手番
           received,    //ユーザからの返答
           data)        // データ
    {
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

    /****************************************************************************
    *** Function Name       : getNextUser()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 次の手番のユーザを取得
    *** Return              : 0
    ****************************************************************************/
    getNextUser(turn)   // 手番
    {
        let next = (turn + 1) % this.players.length;
        console.log("state=" + this.players[next].state);
        let i = 0;
        this.checkWinTerm();
        while(this.players[next].state > 0){
            i++;
            next = (turn + i) % this.players.length;
            if(this.players[next].state == 1){
                this.players[next].state = 0;
                i++;
                next = (turn + i) % this.players.length;
            }
        }
        
        
        return next;
    }

    /****************************************************************************
    *** Function Name       : checkWinTerm()
    *** Designer            : 曾根 悠太
    *** Date                : 2022.07.04
    *** Function            : 勝利条件の確認
    *** Return              : 0
    ****************************************************************************/
    checkWinTerm()
    {
        for(i=0;i<4; i++){
            const isWin = this.players[i].hasItem(this.winTerm[0]) * this.players[i].hasItem(this.winTerm[1]);
            if(isWin){
                this.extraWin(i);
                break;
            }
        }
    }







    /****************************************************************************
    *** Function Name       : effectAddItem()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c3カードの効果
                              
    *** Return              : なし
    ****************************************************************************/
    effectAddItem(player,   // ユーザ
                  itemNum)  // アイテム番号
    {
        player.addItem(this.item[itemNum]);
        this.item.splice(itemNum,1);
        console.log("item removed:"+this.item);
        display.effectAddItem(this.roomId,this.item[itemNum],player.getUserNum());
    }

    /****************************************************************************
    *** Function Name       : addCardRandom()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c4カードの効果
                              ランダムにカードを入手
    *** Return              : なし
    ****************************************************************************/
    addCardRandom(player)   // ユーザ
    {
        let rand = Math.floor(Math.random()*this.deck.length);
        let temp = this.deck[rand];
        this.deck[rand] = this.deck[this.deck.length - 1];
        this.deck[this.deck.length - 1] = temp;
        player.addCard(this.deck.pop()); 
        display.upDateHand(player.getUserId(), player.getHand());
        display.changeHand(this.roomId,player.getUserNum(),player.getHand().length);
    }

    /****************************************************************************
    *** Function Name       : deleteCardRandom()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c5カードの効果
                              ランダムにカードを消去
    *** Return              : なし
    ****************************************************************************/
    deleteCardRandom(player)    // ユーザ
    {
        let Hand = player.getHand();
        let cardNum = Math.floor(Math.random()*Hand.length);
        player.deleteCardNum(cardNum);
        display.upDateHand(player.getUserId(), player.getHand());
    }

    /****************************************************************************
    *** Function Name       : deleteAllItem()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c6カードの効果
                              全てのアイテムカードを消去
    *** Return              : なし
    ****************************************************************************/
    deleteAllItem(player)   // ユーザ
    {
        let j = player.item.length;
        for (let i=0; i<j; ++i){
            this.deleteItemRandom(player);
        }
        console.log("player.hand="+ player.getItem());
        display.deleteAllItem(this.roomId,player.getUserNum());
    }

    /****************************************************************************
    *** Function Name       : deleteAllCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c7カードの効果
                              全てのカードを消去
    *** Return              : なし
    ****************************************************************************/
    deleteAllCard(player)   // ユーザ
    {
        let j = player.hand.length;
        for (let i=0; i<j; ++i){
            let Hand = player.getHand();
            let cardNum = Math.floor(Math.random()*Hand.length);
            player.deleteCardNum(cardNum);
        }
        display.upDateHand(player.getUserId(), player.getHand());
        display.changeHand(this.roomId,player.getUserNum(),player.getHand().length);
    }

    /****************************************************************************
    *** Function Name       : everyoneDeleteRandom()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c8カードの効果
                              全員がランダムにカードを消去
    *** Return              : なし
    ****************************************************************************/
    everyoneDeleteRandom()
    {
        for (let i=0; i<this.players.length; ++i){
            this.deleteCardRandom(this.players[i]);
            display.upDateHand(this.players[i].getUserId(), this.players[i].getHand());
            display.changeHand(this.roomId,this.players[i].getUserNum(),this.players[i].getHand().length);
        }

    }

    /****************************************************************************
    *** Function Name       : everyoneDeleteAllCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c9カードの効果
                              全員が全てのカードを消去
    *** Return              : なし
    ****************************************************************************/
    everyoneDeleteAllCard(player)   // ユーザ
    {
        for (i=0; i<this.players.length; ++i){
            let j = this.players[i].hand.length;
            for (let k=0; k<j; ++k){
                let Hand = this.players[i].getHand();
                let cardNum = Math.floor(Math.random()*Hand.length);
                this.players[i].deleteCardNum(cardNum);
            }
            display.upDateHand(this.players[i].getUserId(), this.players[i].getHand());
            display.changeHand(this.roomId,this.players[i].getUserNum(),this.players[i].getHand().length);
        }
        
    }

    /****************************************************************************
    *** Function Name       : everyoneDeleteAndAdd()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c10カードの効果
                              全員が全てのカードを消去し、3枚手札に加える
    *** Return              : なし
    ****************************************************************************/
    everyoneDeleteAndAdd()
    {
        this.everyoneDeleteAllCard();
        let i = 0;
        for (i=0; i<this.players.length; ++i){
            this.draw(this.players[i], 3);
        }
    }

    /****************************************************************************
    *** Function Name       : effectAddCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c11カードの効果
                              カードを追加する
    *** Return              : なし
    ****************************************************************************/
    effectAddCard(player,   // ユーザ
                  cardNum)  // カード番号
    {
        player.addCard(this.deck[cardNum]);
        display.draw(player.getUserId(),this.deck[cardNum]);
        this.deck.splice(cardNum,1);
        console.log("deck removed:"+this.deck);
    }

    /****************************************************************************
    *** Function Name       : deleteCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c3カードの効果
                              カードIdからカードを消去
    *** Return              : なし
    ****************************************************************************/
    deleteCard(player,  // ユーザ
               cardId)  // カード番号
    {
        player.deleteCard(cardId);
    }

    /****************************************************************************
    *** Function Name       : rest()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c14カードの効果
                              board
    *** Return              : なし
    ****************************************************************************/
    rest(player)    // ユーザ
    {
        player.state = 1;
    }
    
    /****************************************************************************
    *** Function Name       : effectGetNextUser()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : boardのgetNextUserについて
    *** Return              : 次のターン
    ****************************************************************************/
    effectGetNextUser(turn) // 手番
    {
        let i, nextTurn;
        for (i=0; i<this.players.length + 1; ++i){
            nextTurn = (turn + 1 + i) % this.players.length;
            if(this.players[nextTurn]==0){
                break;
            }
            this.players[nextTurn].rest = 0; //次は行動可能
        }
        return nextTurn;

    }

    /****************************************************************************
    *** Function Name       : getRank()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c15カードの効果
                              現在の順位を取得
    *** Return              : 現在の順位
    ****************************************************************************/
    getRank(player) // ユーザ
    {
        let i, Turn, rank=1;
        Turn = this.getTurn();
        for (i=1; i<this.players.length; ++i){
            if(this.players[(Turn + i) % this.players.length].score > player.score){
                ++rank;
            }
        }
        return rank;
    }

    /****************************************************************************
    *** Function Name       : getTurn()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c17カードの効果
                              現在のターンを取得
    *** Return              : 現在のターン
    ****************************************************************************/
    getTurn()
    {
        return this.game.turn;
    }

    /****************************************************************************
    *** Function Name       : changePositionRandom()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c19カードの効果
                              ランダムに位置を入れ替え
    *** Return              : なし
    ****************************************************************************/
    changePositionRandom(player)    // ユーザ
    {
        let Turn = this.getTurn();
        let target = Math.floor(Math.random()*this.players.length);
        if(Turn==target){
            target = (target + 1) % this.players.length;
        }
        this.changePosition(player, this.players[target]);
    }

    /****************************************************************************
    *** Function Name       : diceDueToCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c20カードの効果
                              サイコロを振る
    *** Return              : なし
    ****************************************************************************/
    diceDueToCard(player)   // ユーザ
    {
        this.diceNum = Math.floor(Math.random() * 6) + 1;
        display.dice(player.getUserId(), this.diceNum);
    }

    /****************************************************************************
    *** Function Name       : moveDueToCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c20カードの効果
                              位置を更新し、コマが動く
    *** Return              : なし
    ****************************************************************************/
    moveDueToCard(player,   // ユーザ
                  dice)     // サイコロ
    {
        console.log("position=" + player.getPosition() + "dice=" + dice);
        player.updatePosition(dice);
        display.updatePosition(this.roomId, turn, player.getPosition());
        console.log("position=" + player.getPosition());
    }



    /****************************************************************************
    *** Function Name       : stealCardRandom()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c24カードの効果
                              ランダムにカードを奪う
    *** Return              : なし
    ****************************************************************************/
    stealCardRandom(player,     // ユーザ
                    data)       // データ
    {
        console.log(data.playerNum)
        let cardId = this.players[data.playerNum].getHand()[data.cardNum];
        this.players[data.playerNum].deleteCardNum(data.cardNum);
        this.addCard(player, cardId);
        display.upDateHand(player.getUserId(), player.getHand());
        display.changeHand(this.roomId,player.getUserNum(),player.getHand().length);
        display.upDateHand(this.players[data.playerNum].getUserId(), this.players[data.playerNum].getHand());
        display.changeHand(this.roomId,this.players[data.playerNum].getUserNum(),this.players[data.playerNum].getHand().length);
    }

    /****************************************************************************
    *** Function Name       : selectPlayerHand()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : ユーザのカードを選択する
    *** Return              : なし
    ****************************************************************************/
    selectPlayerHand(player)    // ユーザ
    {
        display.selectPlayerHand(player.getUserId());
    }

    /****************************************************************************
    *** Function Name       : changeCardRandom()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c25カードの効果
                              ランダムにカードを交換
    *** Return              : なし
    ****************************************************************************/
    changeCardRandom(player,        // ユーザ
                     selectPlayer)  // 選択したユーザ
    {
        let CardId = player.getCard[Math.random()*player.getCard.length];
        this.deleteCard(player, CardId);
        this.addCard(selectPlayer, CardId);
        CardId = selectPlayer.getCard[Math.random()*selectPlayer.getCard.length];
        this.deleteCard(selectPlayer, CardId);
        this.addCard(player, CardId);
    }

    /****************************************************************************
    *** Function Name       : changeAllcard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c26カードの効果
                              全てのカードを交換
    *** Return              : なし
    ****************************************************************************/
    changeAllcard(player,       // ユーザ
                  selectPlayer) // 選択したユーザ
    {
        let temp = [];
        temp = player.hand;
        player.hand = selectPlayer.hand.splice(0, 0);
        selectPlayer.hand = temp.splice(0, 0);
    }

    /****************************************************************************
    *** Function Name       : stealCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c28カードの効果
                              カードを奪う    
    *** Return              : なし
    ****************************************************************************/
    stealCard(player,       // ユーザ
              selectPlayer, // 選択したユーザ
              cardId)       // カードのID
    {
        selectPlayer.deleteCard(cardId);
        player.addCard(cardId);
    }

    /****************************************************************************
    *** Function Name       : changeCard()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c29カードの効果
                              全てのカードを交換
    *** Return              : なし
    ****************************************************************************/
    changeCard(player,          // ユーザ
               selectPlayer,    // 選択したユーザ
               myCardId,        // 自分のカードのID
               targetCardId)    // 相手のカードのID
    {
        player.deleteCard(myCardId);
        selectPlayer.addCard(myCardId);
        selectPlayer.deleteCard(targetCardId);
        player.addCard(targetCardId);
    }

    /****************************************************************************
    *** Function Name       : changePosition()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : c30カードの効果
                              位置を入れ替え
    *** Return              : なし
    ****************************************************************************/
    changePosition(player,          // ユーザ
                   selectPlayer)    // 選択したユーザ
    {
        let temp;
        temp = player.position;
        player.position = selectPlayer.position;
        selectPlayer.position = temp;
    }

    /****************************************************************************
    *** Function Name       : updatePosition()
    *** Designer            : 武田和大
    *** Date                : 2022.07.04
    *** Function            : playerのupdatePosition
                            　マイナスになった時の対応
    *** Return              : なし
    ****************************************************************************/
    updatePosition(dice)    // サイコロ
    {
        this.position += dice;
        if(this.position<0){
            this.position += 20;
        }
    }
}