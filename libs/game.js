/*******************************************************************
***  File Name          : game.js
***  Version            : V1.1
***  Designer           : 曾根 悠太 悠太
***  Date               : 2022.06.30
***  Purpose            : UIを更新すると送る
***
*******************************************************************/
/*
*** Revision :
*** v1.0 : 曾根 悠太悠太, 2022.05.17
*** v1.1 : 曾根 悠太悠太, 2022.06.30 仕様変更に伴い全モジュール変更
*/

//モジュール
const Board = require('./board.js');
const receiver = require('./receiver.js');
const reader = require('./cardsReader.js');



//ゲームクラス
//ゲームの全体的な進行をここに記述、各工程に関する記述はBoard.jsに
module.exports = class Game{

    selectCard;
    reveived = 0;
    dice = 0;
    waitUserId = 0;
    alive = 4;

/****************************************************************************
*** Method Name         : constructor()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.06.30
*** Function            : 初期化
*** Return              : 
****************************************************************************/

    //クラスの初期化
    constructor(roomId,userList){
        this.board = new Board(roomId,userList,this);
        this.turn = this.board.setFirstPlayers();
        console.log("turn="+this.turn);
        this.gameState = 1;
        this.board.initdeck();
    }


/****************************************************************************
*** Method Name         : startGame()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.06.30
*** Function            : ゲームの開始
*** Return              : 
****************************************************************************/

    startGame(){
        this.board.startGame();
        this.received = 0;
        this.board.initdeck();
        this.board.firstDraw();
        this.loadGameFlow(null);
    }

/****************************************************************************
*** Method Name         : next()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.06.30
*** Function            : 次の人の番へ
*** Return              : 
****************************************************************************/

    next(){
        this.received = 0;
        this.gameState++;
        this.loadGameFlow(null);
    }


/****************************************************************************
*** Method Name         : receive()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.06.30
*** Function            : クライアントからソケットを受け取った時
*** Return              : 
****************************************************************************/

    receive(data,socketid){
        console.log("wait=" + this.waitUserId + ",socketid=" + socketid);
        if(this.gameState == 1 && data != "drawed"){

        }else if(this.gameState == 2 && data == "drawed"){
        }else{
            if(this.waitUserId == socketid){
                this.received = 1;
                this.loadGameFlow(data);
                this.next();
            }
        }
    }

/****************************************************************************
*** Method Name         : disconnectUser()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.06.30
*** Function            : ユーザが切断したとき
*** Return              : 
****************************************************************************/    
    
    disconnectUser(socketid){
        this.alive--;
        console.log("alive!! ====" + this.alive);
        if(this.alive == 0){
            this.gameState = 10;
            console.log(this.gameState);
            return 0;
        }
        if(this.board.getPlayer(socketid).getUserNum() == this.turn){
            this.gameState = 6;
            this.loadGameFlow(null);
        }
        this.board.disconnect(socketid);
    }

/****************************************************************************
*** Method Name         : looadGameFlow()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.06.30
*** Function            : ゲームフローを読み込む
*** Return              : 
****************************************************************************/

    loadGameFlow(data){

        //以下ゲームフローを記述

        switch(this.gameState){

            case 1:
                //ドロー
                console.log("draw");
                this.waitUserId = this.board.players[this.turn].getUserId();
                this.board.drawPhase(this.turn,this.received);
                break;

            case 2:
                //手札からカードを選択
                console.log("changes");
                this.board.selectCard(this.turn,this.received,data);
                break;

            
            case 3:
                //サイコロを振り、出た目をdiceに代入
                this.dice =  this.board.dice(this.turn,this.received);
                console.log("diced!!" + this.dice);
                break;

            case 4:
                //移動
                this.board.move(this.turn,this.dice,this.received);
                break;

            case 5:
                //踏んだマスの処理
                console.log("action!!");
                this.board.action(this.turn,this.received,data);
                break;

            case 6:
                //次のユーザーに
                console.log("next turn");
                this.turn = this.board.getNextUser(this.turn);
                this.waitUserId = this.board.players[this.turn].getUserId();
                break;

            default:
                break;
            

        }
        if(this.gameState == 6){
            this.gameState = 1;
            this.loadGameFlow();
        }
    }

}